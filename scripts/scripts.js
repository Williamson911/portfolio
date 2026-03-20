document.addEventListener("DOMContentLoaded", () => {

  // ============================================
  // SCROLL REVEAL
  // ============================================
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  }

  // ============================================
  // HEADER SCROLL + TOP BTN (fusionnés)
  // ============================================
  const header = document.querySelector("header");
  const topBtn = document.getElementById("topBtn");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    // Header
    header.classList.toggle("scrolled", y > 50);

    // Top button
    topBtn.style.display = y > 300 ? "block" : "none";

    // Reveal
    revealOnScroll();
  });

  topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Lancer le reveal au chargement aussi
  revealOnScroll();

  // ============================================
  // SMOOTH SCROLL NAV
  // ============================================
  document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // ============================================
  // BURGER MENU
  // ============================================
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu-container");

  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });

  // ============================================
  // CURSOR
  // ============================================
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // ============================================
  // CARDS 3D HOVER
  // ============================================
  document.querySelectorAll(".project").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  });

  // ============================================
  // TYPEWRITER
  // ============================================
  const phrases = [
    "Graphiste qui code. Développeur qui dessine.",
    "Design + Code = Impact",
    "Du pixel au code — je livre les deux."
  ];
  let pi = 0, ci = 0, deleting = false;
  const twEl = document.getElementById("typewriter");

  function typeWriter() {
    const phrase = phrases[pi];
    if (!deleting) {
      twEl.textContent = phrase.substring(0, ci + 1);
      ci++;
      if (ci === phrase.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
    } else {
      twEl.textContent = phrase.substring(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(typeWriter, deleting ? 40 : 80);
  }
  typeWriter();

  // ============================================
  // FILTRES PORTFOLIO
  // ============================================
  document.querySelectorAll(".pf-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pf-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".project").forEach(card => {
        card.classList.toggle("hidden-filter",
          filter !== "all" && card.dataset.category !== filter
        );
      });
    });
  });

  // ============================================
  // MODAL
  // ============================================
  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("sliderImage");
  const closeBtn = document.querySelector(".close");

  let images = [];
  let current = 0;

  const projectImages = {
    project1: ["images/soly.png"],
    project2: [
      "images/savagecast.webp", "images/sc_home.png", "images/sc_home_mobile.png",
      "images/sc_menu_mobile.png", "images/sc_demarche.png", "images/sc_demarche_mobile.png",
      "images/sc_equipe.png", "images/sc_equipe_mobile.png", "images/sc_filmo.png", "images/sc_filmo_mobile.png"
    ],
    project3: ["images/sc_home.png", "images/sc_demarche.png", "images/sc_equipe.png", "images/sc_filmo.png"],
    project4: ["images/sc_home_mobile.png", "images/sc_menu_mobile.png", "images/sc_demarche_mobile.png", "images/sc_equipe_mobile.png", "images/sc_filmo_mobile.png"],
    project5: ["images/callmeuplogo.webp"],
    project6: ["images/tapisnew.jpg"],
    project7: ["images/gglogo.png"]
  };

  const projectData = {
    project1: { tag: "Web Design", title: "Mega × Soly — Landing page", desc: "Partenariat entre Mega et Soly pour la vente et l'installation de panneaux solaires. Landing page mettant en avant les avantages avec un formulaire de devis intégré.", livrables: "Landing page complète, formulaire de devis" },
    project2: { tag: "Identité visuelle", title: "Savage Cast — Refonte logo", desc: "Refonte du logo suite à un changement de nom. Nouvelle identité visuelle adaptée au nouvel univers de la marque.", livrables: "Logo vectoriel, charte graphique" },
    project3: { tag: "Web Design", title: "Savage Cast — Site Desktop", desc: "Refonte complète du site web version desktop. Nouvelle architecture de navigation et mise en page modernisée cohérente avec la nouvelle identité.", livrables: "Maquettes desktop, intégration HTML/CSS" },
    project4: { tag: "Web Design", title: "Savage Cast — Site Mobile", desc: "Adaptation mobile de la refonte du site. Navigation repensée pour les petits écrans avec une expérience utilisateur optimisée.", livrables: "Maquettes mobile, intégration responsive" },
    project5: { tag: "Identité visuelle", title: "Call Me Up — Logo", desc: "Création d'un logo pour une solution IA de téléphonie. Design réfléchi pour refléter l'aspect technologique et moderne du produit.", livrables: "Logo vectoriel, déclinaisons couleurs" },
    project6: { tag: "Identité visuelle", title: "Xeno FighterZ — Logo & tapis de jeu", desc: "Identité visuelle complète pour une team de Dragon Ball Super Card Game. Logo et tapis de jeu personnalisé aux dimensions officielles.", livrables: "Logo vectoriel, tapis de jeu 60×35cm" },
    project7: { tag: "Identité visuelle", title: "Gero Genetics — Logo", desc: "Création d'un logo pour une team de jeux de cartes à collectionner.", livrables: "Logo vectoriel, déclinaisons" }
  };

  function openModal(key, sizeClass) {
    const data = projectData[key];
    images = projectImages[key];
    current = 0;
    modal.style.display = "block";
    modal.scrollTop = 0;
    modalImg.src = images[current];
    modalImg.className = sizeClass ? `${sizeClass}-img` : "";
    if (data) {
      document.getElementById("modalTag").textContent = data.tag;
      document.getElementById("modalTitle").textContent = data.title;
      document.getElementById("modalDesc").textContent = data.desc;
      document.getElementById("modalLivrables").textContent = data.livrables;
    }
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.style.display = "none";
    modalImg.classList.remove("zoomed");
    document.body.style.overflow = "auto";
  }

  document.querySelectorAll(".project").forEach(project => {
    const wrap = project.querySelector(".img-wrap");
    if (wrap) {
      wrap.addEventListener("click", () => {
        openModal(project.dataset.project, project.dataset.imgSize || "");
      });
    }
  });

  document.querySelector(".next").onclick = () => {
    current = (current + 1) % images.length;
    modalImg.src = images[current];
  };

  document.querySelector(".prev").onclick = () => {
    current = (current - 1 + images.length) % images.length;
    modalImg.src = images[current];
  };

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });

  modalImg.addEventListener("click", () => {
    modalImg.classList.toggle("zoomed");
  });

  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-wrapper")) closeModal();
  });

  // ============================================
  // EMAILJS
  // ============================================
  emailjs.init("ZDOrcqnQj6LxdlH62");

  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const success = document.querySelector(".success-message");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    submitBtn.classList.add("loading");
    emailjs.sendForm("service_o3i8iyq", "template_vkj5jzc", this)
      .then(() => {
        submitBtn.classList.remove("loading");
        success.classList.add("show");
        form.reset();
      }, () => {
        submitBtn.classList.remove("loading");
        alert("Erreur lors de l'envoi.");
      });
  });

}); // end DOMContentLoaded