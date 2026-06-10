 // ================================
// DARK MODE
// ================================

const btnDarkMode = document.getElementById('btn-dark-mode');

// vérifier si dark mode était activé avant
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

if (btnDarkMode) {
  btnDarkMode.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // sauvegarder le choix
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'true');
      btnDarkMode.innerHTML = '☀️';
    } else {
      localStorage.setItem('darkMode', 'false');
      btnDarkMode.innerHTML = '🌙';
    }
  });
}

// ================================
// NAVBAR DYNAMIQUE AU SCROLL
// ================================

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ================================
// BOUTON RETOUR EN HAUT
// ================================

const btnTop = document.getElementById('btn-top');

window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    btnTop.style.display = 'block';
  } else {
    btnTop.style.display = 'none';
  }
});

if (btnTop) {
  btnTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ================================
// ANNEE DYNAMIQUE FOOTER
// ================================

const annee = document.getElementById('annee');
if (annee) {
  annee.textContent = new Date().getFullYear();
}
