"use strict";

export default function smoothScrolling() {
  document
    .querySelector(".navbar-nav")
    .addEventListener("click", function (event) {
      event.preventDefault();

      if (event.target.classList.contains("nav-link")) {
        const id = event.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
      }
    });
}
