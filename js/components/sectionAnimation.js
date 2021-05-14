"use strict";

const sections = document.querySelectorAll(".section");

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
