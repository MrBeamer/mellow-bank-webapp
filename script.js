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
const dotsContainer = document.querySelector(".dots");

//Modal

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelector(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");

function openModal() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  modal.style.display = "block";
}

function closeModal() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  modal.style.display = "none";
}

btnShowModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
// window.addEventListener("click", closeModal);

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

// Slider component

function sliderComponent() {
  let currentSlide = 0;
  let maxSlidesLength = slides.length;

  slides.forEach((s, index) => {
    s.style.transform = `translateX(${index}00%)`;
  });

  // Functions

  function createDots() {
    slides.forEach((s, index) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot dots__dot--active" data-slide="${index}"></button>`
      );
    });
  }

  function goToSlide(slide) {
    slides.forEach((s, index) => {
      s.style.transform = `translateX(${index - slide}00%)`;
    });
  }

  function changeActive(slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }

  function dotsSlideControl(event) {
    if (event.target.classList.contains("dots__dot")) {
      const slide = event.target.dataset.slide;
      goToSlide(slide);
      changeActive(slide);
    }
  }

  function nextSlide() {
    if (maxSlidesLength - 1 === currentSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    changeActive(currentSlide);
  }

  function previousSlide() {
    if (currentSlide === 0) {
      currentSlide = maxSlidesLength - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    changeActive(currentSlide);
  }

  function slideArrowControl(event) {
    if (event.key === "ArrowRight") {
      nextSlide();
      changeActive(currentSlide);
    }
    if (event.key === "ArrowLeft") {
      previousSlide();
      changeActive(currentSlide);
    }
  }

  // Calls
  createDots();
  changeActive(0);
  goToSlide(0);

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);
  document.addEventListener("keydown", slideArrowControl);
  dotsContainer.addEventListener("click", dotsSlideControl);
}

// Modal component

// Initializes everything
function init() {
  tabsComponent();
  sliderComponent();
}

init();

// delete min height from grid project cards - gets weird when over 1444p why ? google it
