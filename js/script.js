"use strict";
import slider from "./components/slider.js";
import modals from "./components/modals.js";
import tab from "./components/tab.js";
import logIn from "./components/logIn.js";

//Animation
const sections = document.querySelectorAll(".section");
const nav = document.querySelector(".nav");

// Smooth scrolling

document
  .querySelector(".navbar-nav")
  .addEventListener("click", function (event) {
    event.preventDefault();

    if (event.target.classList.contains("nav-link")) {
      const id = event.target.getAttribute("href");
      console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

// Reveal sections animation
function revealSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}

const revealOptions = { root: null, threshold: 0.15 };

const sectionsObserver = new IntersectionObserver(revealSection, revealOptions);

sections.forEach((section) => {
  sectionsObserver.observe(section);
  section.classList.add("section--hidden");
});

// Navbar active animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav-link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Initializes everything
function init() {
  logIn();
  tab();
  modals();
  slider();
}

init();
