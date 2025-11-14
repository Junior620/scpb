/**
 * SCPB Premium - JavaScript Ultra-Moderne
 * Animations et Interactions Premium
 */

class SCPBPremium {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initHeaderScroll();
    this.initSmoothScroll();
    this.initParallax();
    this.initCursor();
    this.initMagneticButtons();
    this.initDarkMode();
    this.initFloatingIcons();
    this.initTypingEffect();
    this.initMobileMenu();  // ✅ Menu mobile
    console.log('🚀 SCPB Premium initialized');
  }

  // Menu mobile hamburger
  initMobileMenu() {
    // Créer le bouton hamburger
    const header = document.querySelector('.header-container');
    if (!header) return;

    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    // Créer l'overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);

    // Ajouter le bouton au header
    header.appendChild(menuToggle);

    const nav = document.querySelector('.nav');
    if (!nav) return;

    // Toggle menu
    const toggleMenu = () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Fermer le menu au clic sur un lien
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMenu();
        }
      });
    });

    // Fermer le menu au redimensionnement
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && nav.classList.contains('active')) {
        toggleMenu();
      }
    });
  }

  // Effet de typing sur le hero
  initTypingEffect() {
    const heroDescription = document.querySelector('.hero-description');
    
    if (!heroDescription) return;
    
    // Sauvegarder le texte original
    const originalText = heroDescription.textContent.trim();
    
    // Vider le contenu
    heroDescription.textContent = '';
    heroDescription.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 30; // Vitesse en ms
    
    // Fonction de typing
    const type = () => {
      if (charIndex < originalText.length) {
        heroDescription.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        // Ajouter un curseur clignotant à la fin
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        heroDescription.appendChild(cursor);
        
        // Faire disparaître le curseur après 2 secondes
        setTimeout(() => {
          cursor.style.opacity = '0';
        }, 2000);
      }
    };
    
    // Démarrer le typing après un délai
    setTimeout(type, 1000);
  }

  // Mode Dark/Light
  initDarkMode() {
    // Créer le bouton toggle
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<span class="icon">🌙</span>';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(toggle);

    // Charger la préférence
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      toggle.innerHTML = '<span class="icon">☀️</span>';
    }

    // Toggle au clic
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      toggle.innerHTML = isDark ? '<span class="icon">☀️</span>' : '<span class="icon">🌙</span>';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Icônes flottantes infinies
  initFloatingIcons() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const container = document.createElement('div');
    container.className = 'floating-icons';
    
    // Icônes de cacao et café
    const icons = ['🍫', '☕', '🌰', '🫘', '🍫', '☕'];
    
    icons.forEach(icon => {
      const div = document.createElement('div');
      div.className = 'floating-icon';
      div.textContent = icon;
      container.appendChild(div);
    });

    hero.appendChild(container);
  }

  // Animations au scroll
  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Header au scroll
  initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // Smooth scroll
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }

  // Parallax effect (désactivé - causait un défilement étrange du hero)
  initParallax() {
    // Parallax désactivé pour éviter que le hero ne descende trop au scroll
    // Pour réactiver, décommenter le code ci-dessous
    
    /*
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2; // Réduit de 0.5 à 0.2
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
    */
  }

  // Curseur personnalisé
  initCursor() {
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
    document.body.appendChild(cursor);

    const dot = cursor.querySelector('.cursor-dot');
    const outline = cursor.querySelector('.cursor-outline');

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      
      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';
      
      requestAnimationFrame(animateOutline);
    };
    animateOutline();

    // Hover effects
    document.querySelectorAll('a, button, .card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  }

  // Boutons magnétiques
  initMagneticButtons() {
    if (window.innerWidth < 1024) return;

    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
  new SCPBPremium();
});

// Ajouter les styles du curseur
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
  .custom-cursor {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
  }

  .cursor-dot {
    width: 8px;
    height: 8px;
    background: #698714;
    border-radius: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 10001;
  }

  .cursor-outline {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(105, 135, 20, 0.5);
    border-radius: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: width 0.3s, height 0.3s, border-color 0.3s;
    z-index: 10000;
  }

  .custom-cursor.cursor-hover .cursor-outline {
    width: 60px;
    height: 60px;
    border-color: rgba(105, 135, 20, 0.8);
  }

  * {
    cursor: none !important;
  }

  @media (max-width: 1024px) {
    .custom-cursor {
      display: none;
    }
    * {
      cursor: auto !important;
    }
  }
`;
document.head.appendChild(cursorStyles);

// ============================================
// NEWSLETTER FORM
// ============================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (!email) return;
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success
        emailInput.value = '';
        emailInput.placeholder = 'Merci pour votre inscription!';
        setTimeout(() => {
          emailInput.placeholder = 'Votre email';
        }, 3000);
      } else {
        // Error
        alert(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      alert('Erreur de connexion au serveur');
    }
  });
}


// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };
    
    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Message envoyé avec succès ! Nous vous répondrons bientôt.';
        contactForm.reset();
      } else {
        // Error
        formMessage.className = 'form-message error';
        formMessage.textContent = data.message || 'Une erreur est survenue. Veuillez réessayer.';
      }
    } catch (error) {
      console.error('Contact form error:', error);
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Erreur de connexion au serveur. Veuillez réessayer plus tard.';
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        Envoyer le message
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  });
}


// ============================================
// ANIMATIONS PREMIUM AVANCÉES
// ============================================

// 1. Barre de progression du scroll
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// 2. Header qui se réduit au scroll
function initShrinkingHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// 3. Effet de parallax sur les sections
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.hero-container');
    
    parallaxElements.forEach(el => {
      const speed = 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// 4. Effet de tilt 3D sur les cards
function initCardTilt() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// 5. Ripple effect sur les boutons
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn, button');
  
  buttons.forEach(button => {
    button.classList.add('ripple');
    
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// 6. Smooth scroll pour les ancres
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 7. Animation au scroll avec Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optionnel: arrêter d'observer après animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// 8. Effet de typing sur le hero (amélioré)
function initTypingEffect() {
  const heroDescription = document.querySelector('.hero-description');
  
  if (!heroDescription) return;
  
  const text = heroDescription.textContent;
  heroDescription.textContent = '';
  heroDescription.style.opacity = '1';
  
  // Créer un span pour le curseur
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '|';
  cursor.style.animation = 'blink 0.7s infinite';
  
  let i = 0;
  const speed = 30; // Vitesse de frappe (ms)
  
  const typeWriter = () => {
    if (i < text.length) {
      heroDescription.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      // Ajouter le curseur à la fin
      heroDescription.appendChild(cursor);
      // Retirer le curseur après 2 secondes
      setTimeout(() => {
        cursor.style.opacity = '0';
      }, 2000);
    }
  };
  
  // Démarrer après un petit délai
  setTimeout(typeWriter, 800);
}

// 9. Curseur personnalisé avec trail
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorTrail = document.createElement('div');
  cursorTrail.className = 'custom-cursor-trail';
  document.body.appendChild(cursorTrail);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorTrail.style.left = e.clientX + 'px';
      cursorTrail.style.top = e.clientY + 'px';
    }, 100);
  });
}

// 10. Effet de glow sur les éléments au hover
function initGlowEffect() {
  const glowElements = document.querySelectorAll('.card, .btn');
  
  glowElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 30px rgba(138, 185, 31, 0.4)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
}

// Initialiser toutes les animations au chargement
document.addEventListener('DOMContentLoaded', () => {
  createScrollProgress();
  initShrinkingHeader();
  initParallax();
  initCardTilt();
  initRippleEffect();
  initSmoothScroll();
  initScrollAnimations();
  initGlowEffect();
  initTypingEffect();  // ✅ Effet typing activé
  
  // Optionnel: activer le curseur personnalisé (peut être lourd)
  // initCustomCursor();
  
  console.log('✨ Animations premium activées!');
});
