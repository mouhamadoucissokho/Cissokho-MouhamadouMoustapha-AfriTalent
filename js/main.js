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
// ===== FILTRAGE FREELANCES =====
const boutonsFiltres = document.querySelectorAll('#filtres button');
const cartesFree = document.querySelectorAll('#grille-freelances [data-categorie]');

if (boutonsFiltres.length > 0) {
  boutonsFiltres.forEach(function(btn) {
    btn.addEventListener('click', function() {

      // Mise à jour des boutons actifs
      boutonsFiltres.forEach(function(b) {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline-primary');
      });
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('btn-primary');

      const categorie = btn.getAttribute('data-categorie');

      cartesFree.forEach(function(carte) {
        if (categorie === 'tous' || carte.getAttribute('data-categorie') === categorie) {
          carte.style.display = 'block';
        } else {
          carte.style.display = 'none';
        }
      });
    });
  });
}

// ===== VALIDATION FORMULAIRE CONTACT =====
const btnEnvoyer = document.getElementById('btn-envoyer');

if (btnEnvoyer) {
  btnEnvoyer.addEventListener('click', function() {

    // Récupération des champs
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const sujet = document.getElementById('sujet');
    const message = document.getElementById('message');

    // Récupération des zones d'erreur
    const errNom = document.getElementById('erreur-nom');
    const errPrenom = document.getElementById('erreur-prenom');
    const errEmail = document.getElementById('erreur-email');
    const errSujet = document.getElementById('erreur-sujet');
    const errMessage = document.getElementById('erreur-message');

    // Regex email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valide = true;

    // Réinitialisation des erreurs
    [nom, prenom, email, sujet, message].forEach(function(champ) {
      champ.classList.remove('is-invalid', 'is-valid');
    });
    [errNom, errPrenom, errEmail, errSujet, errMessage].forEach(function(err) {
      err.textContent = '';
    });

    // Vérification nom
    if (nom.value.trim() === '') {
      errNom.textContent = 'Le nom est obligatoire.';
      nom.classList.add('is-invalid');
      valide = false;
    } else {
      nom.classList.add('is-valid');
    }

    // Vérification prénom
    if (prenom.value.trim() === '') {
      errPrenom.textContent = 'Le prénom est obligatoire.';
      prenom.classList.add('is-invalid');
      valide = false;
    } else {
      prenom.classList.add('is-valid');
    }

    // Vérification email
    if (email.value.trim() === '') {
      errEmail.textContent = "L'email est obligatoire.";
      email.classList.add('is-invalid');
      valide = false;
    } else if (!regexEmail.test(email.value.trim())) {
      errEmail.textContent = "L'adresse email n'est pas valide.";
      email.classList.add('is-invalid');
      valide = false;
    } else {
      email.classList.add('is-valid');
    }

    // Vérification sujet
    if (sujet.value === '') {
      errSujet.textContent = 'Veuillez choisir un sujet.';
      sujet.classList.add('is-invalid');
      valide = false;
    } else {
      sujet.classList.add('is-valid');
    }

    // Vérification message (minimum 20 caractères)
    if (message.value.trim() === '') {
      errMessage.textContent = 'Le message est obligatoire.';
      message.classList.add('is-invalid');
      valide = false;
    } else if (message.value.trim().length < 20) {
      errMessage.textContent = 'Le message doit contenir au moins 20 caractères.';
      message.classList.add('is-invalid');
      valide = false;
    } else {
      message.classList.add('is-valid');
    }

    // Si tout est valide → message de succès
    if (valide) {
      document.getElementById('formulaire-contact').style.display = 'none';
      document.getElementById('message-succes').classList.remove('d-none');
    }
  });
}