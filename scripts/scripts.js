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

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};
const text = "Graphic & Web Designer";
let index = 0;

function typeWriter() {

  if (index < text.length) {

    document.getElementById("typewriter").innerHTML += text.charAt(index);

    index++;

    setTimeout(typeWriter, 80);

  }

}

typeWriter();
const cards = document.querySelectorAll(".project");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

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

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});
const photop = document.querySelector(".photo-parallax img");

window.addEventListener("scroll", () => {

  const offset = window.scrollY * 0.1;

  photop.style.transform = `translateY(${offset}px)`;

});
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("sliderImage");
const closeBtn = document.querySelector(".close");

const projects = document.querySelectorAll(".project");

let images = [];
let current = 0;
const projectImages = {
  project1: [
    "images/soly.png",
  ],

  project2: [
    "images/savagecast.webp",
    "images/sc_home.png",
    "images/sc_home_mobile.png",
    "images/sc_menu_mobile.png",
    "images/sc_demarche.png",
    "images/sc_demarche_mobile.png",
    "images/sc_equipe.png",
    "images/sc_equipe_mobile.png",
    "images/sc_filmo.png",
    "images/sc_filmo_mobile.png"

  ],
  project3: [
    "images/callmeuplogo.webp"
  ],
  project4: [
    "images/tapisnew.jpg"
  ],
  project5: [
    "images/gglogo.png"
  ]
};

projects.forEach(project => {

  project.addEventListener("click", () => {

    const key = project.dataset.project;
    const sizeClass = project.dataset.imgSize || "";

    images = projectImages[key];
    current = 0;

    modal.style.display = "block";

    modalImg.src = images[current];

    modalImg.className = "";

    if (sizeClass) {
      modalImg.classList.add(sizeClass + "-img");
    }

    modalImg.classList.remove("zoomed");

    document.body.style.overflow = "hidden";

  });

});

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

closeBtn.onclick = () => {

  modal.style.display = "none";
  modalImg.classList.remove("zoomed");
  document.body.style.overflow = "auto";

};

modalImg.addEventListener("click", () => {

  modalImg.classList.toggle("zoomed");

});

window.addEventListener("click", (e) => {

  if (e.target === modal) {

    modal.style.display = "none";
    modalImg.classList.remove("zoomed");
    document.body.style.overflow = "auto";

  }

});
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

  }, function(error){

    button.classList.remove("loading");
    alert("Erreur lors de l'envoi.");

  });

});
