"use strict";

const nav = document.querySelector(".nav");

export default function navbarAnimation() {
  // Navbar active animation
  function handleHover(e) {
    if (e.target.classList.contains("nav-link")) {
      const link = e.target;
      const siblings = link.closest(".nav").querySelectorAll(".nav-link");
      const logo = link.closest(".nav").querySelector("img");

      siblings.forEach((el) => {
        if (el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  }
  nav.addEventListener("mouseover", handleHover.bind(0.5));
  nav.addEventListener("mouseout", handleHover.bind(1));
}
