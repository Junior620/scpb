const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'pages/about.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'pages/services.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'pages/blog.html')));
app.get('/portfolio', (req, res) => res.sendFile(path.join(__dirname, 'pages/portfolio.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'pages/contact.html')));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact:', { name, email, message });
  res.json({ success: true, message: 'Message envoyé!' });
});

app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  console.log('Newsletter:', email);
  res.json({ success: true, message: 'Inscription réussie!' });
});

// Fonction pour récupérer des articles depuis NewsAPI
function fetchNewsArticles(query, category) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.NEWS_API_KEY || 'demo';
    
    // Utiliser /top-headlines (gratuit) au lieu de /everything (payant)
    // Catégories disponibles: business, entertainment, general, health, science, sports, technology
    const newsCategory = category === 'agriculture' ? 'science' : 'general';
    const encodedQuery = encodeURIComponent(query);
    
    // Top headlines avec recherche par mot-clé
    const url = `https://newsapi.org/v2/top-headlines?q=${encodedQuery}&category=${newsCategory}&pageSize=20&apiKey=${apiKey}`;
    
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          // Afficher l'erreur si présente
          if (result.status === 'error') {
            console.error('❌ Erreur NewsAPI:', result.code, '-', result.message);
            resolve([]);
            return;
          }
          
          if (result.status === 'ok' && result.articles) {
            const articles = result.articles
              .filter(article => article.title && article.description && article.title !== '[Removed]')
              .map(article => ({
                title: article.title,
                description: article.description || article.content?.substring(0, 200) + '...',
                image: article.urlToImage || 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800',
                category: category,
                date: article.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
                author: article.source?.name || 'Source',
                url: article.url
              }));
            
            if (articles.length > 0) {
              console.log(`✅ ${articles.length} articles "${query}" récupérés`);
            }
            resolve(articles);
          } else {
            resolve([]);
          }
        } catch (error) {
          console.error('❌ Erreur parsing NewsAPI:', error.message);
          resolve([]);
        }
      });
    }).on('error', (error) => {
      resolve([]);
    });
  });
}

// Articles locaux de fallback
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

app.get('/api/blog/articles', async (req, res) => {
  const { category } = req.query;
  
  try {
    let allArticles = [];
    
    // Récupérer des vrais articles selon la catégorie
    console.log(`📰 Récupération articles pour catégorie: ${category || 'all'}`);
    
    if (category === 'all' || !category) {
      // Récupérer des articles sur cacao, café et agriculture
      const [cacaoArticles, coffeeArticles, agriArticles] = await Promise.all([
        fetchNewsArticles('cocoa OR cacao', 'cacao'),
        fetchNewsArticles('coffee', 'coffee'),
        fetchNewsArticles('sustainable agriculture OR farming', 'agriculture')
      ]);
      allArticles = [...cacaoArticles, ...coffeeArticles, ...agriArticles];
    } else if (category === 'cacao') {
      allArticles = await fetchNewsArticles('cocoa OR cacao', 'cacao');
    } else if (category === 'coffee') {
      allArticles = await fetchNewsArticles('coffee', 'coffee');
    } else if (category === 'agriculture') {
      allArticles = await fetchNewsArticles('sustainable agriculture OR farming', 'agriculture');
    }
    
    // Si pas d'articles ou erreur API, utiliser les articles locaux
    if (allArticles.length === 0) {
      console.log('⚠️  Aucun article NewsAPI - Utilisation des articles locaux (fallback)');
      console.log('💡 Conseil: Le plan gratuit NewsAPI a des limitations. Les articles locaux sont une bonne alternative.');
      allArticles = LOCAL_ARTICLES;
    } else {
      console.log(`✅ ${allArticles.length} articles récupérés depuis NewsAPI`);
    }
    
    res.json({ success: true, articles: allArticles });
  } catch (error) {
    console.error('Erreur API:', error);
    res.json({ success: true, articles: LOCAL_ARTICLES });
  }
});

app.listen(PORT, () => console.log(`🚀 SCPB Premium sur http://localhost:${PORT}`));
