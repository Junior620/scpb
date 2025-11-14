/**
 * SCPB Blog - Gestion des articles
 * Utilise NewsAPI et une API locale pour les articles sur le cacao et le café
 */

// Configuration
const BLOG_CONFIG = {
  articlesPerPage: 9,
  currentPage: 1,
  currentCategory: 'all',
  articles: []
};

// Articles locaux (fallback si API ne fonctionne pas)
const LOCAL_ARTICLES = [
  {
    title: "Le Cacao Camerounais: Un Trésor National",
    description: "Le Cameroun est l'un des plus grands producteurs de cacao en Afrique. Découvrez l'histoire et les techniques de culture qui font la renommée du cacao camerounais.",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800",
    category: "cacao",
    date: "2024-11-15",
    author: "SCPB SARL",
    url: "#"
  },
  {
    title: "Culture Biologique du Cacao: Nos Méthodes",
    description: "SCPB SARL adopte des pratiques biologiques pour cultiver un cacao de qualité supérieure tout en préservant l'environnement.",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4a0a4e63?w=800",
    category: "cacao",
    date: "2024-11-14",
    author: "SCPB SARL",
    url: "#"
  },
  {
    title: "Le Café Arabica des Hauts Plateaux",
    description: "Le café arabica cultivé dans les montagnes camerounaises offre des arômes uniques appréciés des connaisseurs du monde entier.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
    category: "coffee",
    date: "2024-11-13",
    author: "SCPB SARL",
    url: "#"
  },
  {
    title: "Traçabilité: De la Fève à la Tablette",
    description: "Comment nous assurons une traçabilité complète de nos produits, garantissant qualité et transparence à nos clients.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    category: "cacao",
    date: "2024-11-12",
    author: "SCPB SARL",
    url: "#"
  },
  {
    title: "Agriculture Durable: Notre Engagement",
    description: "Les pratiques durables que nous mettons en œuvre pour protéger l'environnement et soutenir les communautés locales.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
    category: "agriculture",
    date: "2024-11-11",
    author: "SCPB SARL",
    url: "#"
  },
  {
    title: "Le Robusta Camerounais: Force et Caractère",
    description: "Le café robusta du Cameroun se distingue par sa force et son corps, idéal pour les expressos et les mélanges.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    category: "coffee",
    date: "2024-11-10",
    author: "SCPB SARL",
    url: "#"
  },
  {
    title: "Formation des Agriculteurs: Un Investissement",
    description: "Nos programmes de formation permettent aux agriculteurs d'améliorer leurs techniques et d'augmenter leur productivité.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    category: "agriculture",
    date: "2024-11-09",
    author: "SCPB SARL",
    url: "#"
  },
  {
    title: "Certifications Internationales: Gage de Qualité",
    description: "Les certifications que nous avons obtenues témoignent de notre engagement envers l'excellence et la durabilité.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    category: "cacao",
    date: "2024-11-08",
    author: "SCPB SARL",
    url: "#"
  },
  {
    title: "Torréfaction Artisanale: L'Art du Café",
    description: "Découvrez les secrets de la torréfaction artisanale qui révèle tous les arômes de nos cafés d'exception.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
    category: "coffee",
    date: "2024-11-07",
    author: "SCPB SARL",
    url: "#"
  }
];

// Fonction pour charger les articles
async function loadBlogArticles(category = 'all') {
  const blogLoading = document.getElementById('blogLoading');
  const blogError = document.getElementById('blogError');
  const blogGrid = document.getElementById('blogGrid');
  
  if (!blogLoading || !blogGrid) {
    console.error('Elements not found');
    return;
  }
  
  // Afficher le loading
  blogLoading.style.display = 'block';
  if (blogError) blogError.style.display = 'none';
  blogGrid.style.display = 'none';
  
  try {
    // Essayer de charger depuis l'API
    const response = await fetch(`/api/blog/articles?category=${category}`);
    
    if (response.ok) {
      const data = await response.json();
      // Copier les articles pour éviter les mutations
      const allArticles = [...(data.articles || LOCAL_ARTICLES)];
      
      // Filtrer par catégorie
      if (category !== 'all') {
        BLOG_CONFIG.articles = allArticles.filter(
          article => article.category === category
        );
      } else {
        BLOG_CONFIG.articles = allArticles;
      }
    } else {
      // Utiliser les articles locaux en fallback
      BLOG_CONFIG.articles = category === 'all' 
        ? [...LOCAL_ARTICLES]
        : LOCAL_ARTICLES.filter(article => article.category === category);
    }
  } catch (error) {
    console.log('Utilisation des articles locaux:', error);
    // Utiliser les articles locaux en fallback
    BLOG_CONFIG.articles = category === 'all' 
      ? [...LOCAL_ARTICLES]
      : LOCAL_ARTICLES.filter(article => article.category === category);
  }
  
  // Afficher les articles
  displayArticles();
  
  // Cacher le loading
  blogLoading.style.display = 'none';
  blogGrid.style.display = 'grid';
}

// Fonction pour afficher les articles
function displayArticles() {
  const blogGrid = document.getElementById('blogGrid');
  const startIndex = (BLOG_CONFIG.currentPage - 1) * BLOG_CONFIG.articlesPerPage;
  const endIndex = startIndex + BLOG_CONFIG.articlesPerPage;
  const articlesToShow = BLOG_CONFIG.articles.slice(startIndex, endIndex);
  
  if (articlesToShow.length === 0) {
    blogGrid.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <div class="card-icon" style="margin: 0 auto 1.5rem;">📝</div>
        <h3 class="card-title">Aucun article trouvé</h3>
        <p class="card-description">Essayez une autre catégorie ou revenez plus tard.</p>
      </div>
    `;
    return;
  }
  
  blogGrid.innerHTML = articlesToShow.map(article => `
    <article class="blog-card card animate-on-scroll">
      <div class="blog-card-image" style="background-image: url('${article.image}'); background-size: cover; background-position: center; height: 200px; border-radius: 12px; margin-bottom: 1.5rem;"></div>
      <div class="blog-meta">
        <span class="blog-date">${formatDate(article.date)}</span>
        <span class="blog-category">${getCategoryLabel(article.category)}</span>
      </div>
      <h3 class="card-title">${article.title}</h3>
      <p class="card-description">${article.description}</p>
      <a href="${article.url}" class="blog-read-more" target="_blank" rel="noopener">
        Lire la suite →
      </a>
    </article>
  `).join('');
  
  // Mettre à jour la pagination
  updatePagination();
  
  // Réactiver les animations scroll
  setTimeout(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      el.classList.add('animated');
    });
  }, 100);
}

// Fonction pour formater la date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}

// Fonction pour obtenir le label de catégorie
function getCategoryLabel(category) {
  const labels = {
    'cacao': 'Cacao',
    'coffee': 'Café',
    'agriculture': 'Agriculture',
    'all': 'Tous'
  };
  return labels[category] || category;
}

// Fonction pour mettre à jour la pagination
function updatePagination() {
  const totalPages = Math.ceil(BLOG_CONFIG.articles.length / BLOG_CONFIG.articlesPerPage);
  const pagination = document.getElementById('blogPagination');
  const pageInfo = document.getElementById('pageInfo');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  
  if (totalPages <= 1) {
    pagination.style.display = 'none';
    return;
  }
  
  pagination.style.display = 'flex';
  pageInfo.textContent = `Page ${BLOG_CONFIG.currentPage} sur ${totalPages}`;
  
  prevBtn.disabled = BLOG_CONFIG.currentPage === 1;
  nextBtn.disabled = BLOG_CONFIG.currentPage === totalPages;
  
  prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
  nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
}

// Gestion des filtres
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    
    // Ajouter la classe active au bouton cliqué
    btn.classList.add('active');
    
    // Charger les articles de la catégorie
    const category = btn.dataset.category;
    BLOG_CONFIG.currentCategory = category;
    BLOG_CONFIG.currentPage = 1;
    loadBlogArticles(category);
  });
});

// Gestion de la pagination
document.getElementById('prevPage')?.addEventListener('click', () => {
  if (BLOG_CONFIG.currentPage > 1) {
    BLOG_CONFIG.currentPage--;
    displayArticles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

document.getElementById('nextPage')?.addEventListener('click', () => {
  const totalPages = Math.ceil(BLOG_CONFIG.articles.length / BLOG_CONFIG.articlesPerPage);
  if (BLOG_CONFIG.currentPage < totalPages) {
    BLOG_CONFIG.currentPage++;
    displayArticles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Newsletter inline
const blogNewsletterForm = document.getElementById('blogNewsletterForm');
if (blogNewsletterForm) {
  blogNewsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = blogNewsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        emailInput.value = '';
        emailInput.placeholder = 'Merci pour votre inscription!';
        setTimeout(() => {
          emailInput.placeholder = 'Votre email';
        }, 3000);
      }
    } catch (error) {
      console.error('Newsletter error:', error);
    }
  });
}

// Charger les articles au chargement de la page
if (document.getElementById('blogGrid')) {
  loadBlogArticles();
}
