// ============================
// script.js – fonctions globales IMPUMAT
// ============================

// Smooth scroll pour les ancres
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if(target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Optionnel : toggle menu mobile si nécessaire
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if(menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Ajout éventuel de petites alertes ou log pour debug
console.log("script.js loaded successfully");
