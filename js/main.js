// dark mode
const btnDarkMode = document.getElementById('btn-dark-mode');

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  if (btnDarkMode) btnDarkMode.innerHTML = '☀️';
}

if (btnDarkMode) {
  btnDarkMode.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'true');
      btnDarkMode.innerHTML = '☀️';
    } else {
      localStorage.setItem('darkMode', 'false');
      btnDarkMode.innerHTML = '🌙';
    }
  });
}

// navbar au scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// bouton retour en haut
const btnTop = document.getElementById('btn-top');

window.addEventListener('scroll', function() {
  if (btnTop) {
    if (window.scrollY > 200) {
      btnTop.style.display = 'block';
    } else {
      btnTop.style.display = 'none';
    }
  }
});

if (btnTop) {
  btnTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// annee footer
const annee = document.getElementById('annee');
if (annee) {
  annee.textContent = new Date().getFullYear();
}

// fade-in au scroll
const elementsFadeIn = document.querySelectorAll('.fade-in');

const observerFadeIn = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerFadeIn.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

elementsFadeIn.forEach(function(el) {
  observerFadeIn.observe(el);
});

// compteurs animes
const compteurs = document.querySelectorAll('.compteur');

const observerCompteur = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const cible = parseInt(entry.target.getAttribute('data-target'));
      let valeur = 0;
      const increment = cible / 100;

      const timer = setInterval(function() {
        valeur += increment;
        if (valeur >= cible) {
          entry.target.textContent = cible.toLocaleString();
          clearInterval(timer);
        } else {
          entry.target.textContent = Math.floor(valeur).toLocaleString();
        }
      }, 20);

      observerCompteur.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

compteurs.forEach(function(c) {
  observerCompteur.observe(c);
});