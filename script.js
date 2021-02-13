"use strict";

// Tab
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Slider
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

// Tabs component

function tabsComponent() {
  tabsContainer.addEventListener("click", function (event) {
    const clicked = event.target.closest(".operations__tab");

    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabsContent.forEach((content) =>
      content.classList.remove("operations__content--active")
    );
    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));

    // Add active class
    clicked.classList.add("operations__tab--active");

    // Activate active content
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });
}

function sliderComponent() {
  let currentSlide = 0;
  let maxSlidesLength = slides.length;

  slides.forEach((s, index) => {
    s.style.transform = `translateX(${index}00%)`;
  });

  // Functions

  function goToSlide(slide) {
    slides.forEach((s, index) => {
      s.style.transform = `translateX(${index - slide}00%)`;
    });
  }

  function nextSlide() {
    if (maxSlidesLength - 1 === currentSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  }

  function previousSlide() {
    if (currentSlide === 0) {
      currentSlide = maxSlidesLength - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  }

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);
  document.addEventListener("keydown", function (event) {
    console.log(event);
  });
}

// Initializes everything
function init() {
  tabsComponent();
  sliderComponent();
}

init();

// change project height to max-height 285px or try overflow hidden because on desktop its to big - my portfolio
// delete min height from grid project cards - gets weird when over 1444p why ? google it
