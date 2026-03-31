// Elements
const menu = document.getElementById("menu");
const closeButton = document.getElementById("close-mobile");
const nav = document.getElementById("nav-mobile");
const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("theme-toggle");
const langToggle = document.getElementById("lang-toggle");

// --- MOBILE MENU LOGIC ---
menu.addEventListener("click", () => {
  nav.classList.add("show");
  document.body.style.overflow = "hidden";
});

closeButton.addEventListener("click", () => {
  nav.classList.remove("show");
  document.body.style.overflow = "auto";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    document.body.style.overflow = "auto";
  });
});

// --- THEME SWITCHING LOGIC ---
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggle.querySelector("box-icon").setAttribute("name", "sun");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  let theme = "dark";
  const icon = themeToggle.querySelector("box-icon");

  if (document.body.classList.contains("light-mode")) {
    theme = "light";
    icon.setAttribute("name", "sun");
  } else {
    icon.setAttribute("name", "moon");
  }
  localStorage.setItem("theme", theme);
});

// --- LANGUAGE SWITCHING LOGIC ---
let currentLang = localStorage.getItem("lang") || "en";

const translations = {
  update() {
    const elements = document.querySelectorAll("[data-en]");
    elements.forEach(el => {
      const text = el.getAttribute(`data-${currentLang}`);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.setAttribute("placeholder", text);
      } else {
        el.textContent = text;
      }
    });
    
    // Update Flag Icon: show the OTHER flag to switch to
    const flagImg = langToggle.querySelector("img");
    if (currentLang === "en") {
      flagImg.setAttribute("src", "https://flagcdn.com/w40/id.png");
      flagImg.setAttribute("alt", "ID");
    } else {
      flagImg.setAttribute("src", "https://flagcdn.com/w40/gb.png");
      flagImg.setAttribute("alt", "EN");
    }
  }
};

// Initialize language
translations.update();

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "id" : "en";
  localStorage.setItem("lang", currentLang);
  translations.update();
});
