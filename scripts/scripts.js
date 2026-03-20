const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Filtres portfolio
document.querySelectorAll(".pf-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pf-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project").forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden-filter");
      } else {
        card.classList.add("hidden-filter");
      }
    });
  });
});

const phrases = [
  "Graphiste & développeur web",
  "Interfaces belles & fonctionnelles",
  "Design + Code = Impact"
];
let pi = 0, ci = 0, deleting = false;

function typeWriter() {
  const phrase = phrases[pi];
  if (!deleting) {
    document.getElementById("typewriter").textContent = phrase.substring(0, ci + 1);
    ci++;
    if (ci === phrase.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
  } else {
    document.getElementById("typewriter").textContent = phrase.substring(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeWriter, deleting ? 40 : 80);
}
typeWriter();

document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

const btn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

btn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const cards = document.querySelectorAll(".project");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu-container");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("sliderImage");
  const closeBtn = document.querySelector(".close");
  const projects = document.querySelectorAll(".project");

  let images = [];
  let current = 0;

  const projectImages = {
    project1: ["images/soly.png"],
    project2: [
      "images/savagecast.webp","images/sc_home.png","images/sc_home_mobile.png",
      "images/sc_menu_mobile.png","images/sc_demarche.png","images/sc_demarche_mobile.png",
      "images/sc_equipe.png","images/sc_equipe_mobile.png","images/sc_filmo.png","images/sc_filmo_mobile.png"
    ],
    project3: ["images/sc_home.png","images/sc_demarche.png","images/sc_equipe.png","images/sc_filmo.png"],
    project4: ["images/sc_home_mobile.png","images/sc_menu_mobile.png","images/sc_demarche_mobile.png","images/sc_equipe_mobile.png","images/sc_filmo_mobile.png"],
    project5: ["images/callmeuplogo.webp"],
    project6: ["images/tapisnew.jpg"],
    project7: ["images/gglogo.png"]
  };

  const projectData = {
    project1: { tag:"Web Design", title:"Mega x Soly - Landing page", desc:"Partenariat entre Mega et Soly pour la vente et l'installation de panneaux solaires. Landing page mettant en avant les avantages avec un formulaire de devis intégré.", livrables:"Landing page complète, formulaire de devis" },
    project2: { tag:"Identité visuelle", title:"Savage Cast - Refonte logo", desc:"Refonte du logo suite à un changement de nom. Nouvelle identité visuelle adaptée au nouvel univers de la marque.", livrables:"Logo vectoriel, charte graphique" },
    project3: { tag:"Web Design", title:"Savage Cast - Site Desktop", desc:"Refonte complète du site web version desktop. Nouvelle architecture de navigation et mise en page modernisée cohérente avec la nouvelle identité.", livrables:"Maquettes desktop, intégration HTML/CSS" },
    project4: { tag:"Web Design", title:"Savage Cast - Site Mobile", desc:"Adaptation mobile de la refonte du site. Navigation repensée pour les petits écrans avec une expérience utilisateur optimisée.", livrables:"Maquettes mobile, intégration responsive" },
    project5: { tag:"Identité visuelle", title:"Call Me Up - Logo", desc:"Création d'un logo pour une solution IA de téléphonie. Design réfléchi pour refléter l'aspect technologique et moderne du produit.", livrables:"Logo vectoriel, déclinaisons couleurs" },
    project6: { tag:"Identité visuelle", title:"Xeno FighterZ - Logo & tapis de jeu", desc:"Identité visuelle complète pour une team de Dragon Ball Super Card Game. Logo et tapis de jeu personnalisé aux dimensions officielles.", livrables:"Logo vectoriel, tapis de jeu 60x35cm" },
    project7: { tag:"Identité visuelle", title:"Gero Genetics - Logo", desc:"Création d'un logo pour une team de jeux de cartes à collectionner.", livrables:"Logo vectoriel, déclinaisons" }
  };

  // Ouvrir la modale
  projects.forEach(project => {
    project.addEventListener("click", () => {
      const key = project.dataset.project;
      const sizeClass = project.dataset.imgSize || "";
      const data = projectData[key];
      images = projectImages[key];
      current = 0;
      modal.style.display = "block";
      modal.scrollTop = 0;
      modalImg.src = images[current];
      modalImg.className = "";
      if (sizeClass) modalImg.classList.add(sizeClass + "-img");
      modalImg.classList.remove("zoomed");
      if (data) {
        document.getElementById("modalTag").textContent = data.tag;
        document.getElementById("modalTitle").textContent = data.title;
        document.getElementById("modalDesc").textContent = data.desc;
        document.getElementById("modalLivrables").textContent = data.livrables;
      }
      document.body.style.overflow = "hidden";
    });
  });

  // Navigation carousel
  document.querySelector(".next").onclick = () => {
    current++;
    if (current >= images.length) current = 0;
    modalImg.src = images[current];
  };

  document.querySelector(".prev").onclick = () => {
    current--;
    if (current < 0) current = images.length - 1;
    modalImg.src = images[current];
  };

  // Fermer la modale — fonction unique
  function closeModal() {
    modal.style.display = "none";
    modalImg.classList.remove("zoomed");
    document.body.style.overflow = "auto";
  }

  // Croix
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });

  // Zoom image
  modalImg.addEventListener("click", () => {
    modalImg.classList.toggle("zoomed");
  });

  // Clic en dehors de l'image et du bloc info
modal.addEventListener("click", (e) => {
  if (!e.target.closest(".modal-wrapper")) {
    closeModal();
  }
});

}); // end DOMContentLoaded

emailjs.init("ZDOrcqnQj6LxdlH62");

const form = document.getElementById("contact-form");
const button = document.getElementById("submit-btn");
const success = document.querySelector(".success-message");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  button.classList.add("loading");

  emailjs.sendForm(
    "service_o3i8iyq",
    "template_vkj5jzc",
    this
  ).then(function() {
    button.classList.remove("loading");
    success.classList.add("show");
    form.reset();
  }, function(error) {
    button.classList.remove("loading");
    alert("Erreur lors de l'envoi.");
  });
});