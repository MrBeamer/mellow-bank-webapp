"use strict";

// not finished refactoring / split to modules

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

// Login
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const submitFormBtn = document.querySelector(".btn-submit");
const alert = document.querySelector(".alert");

// New Account
const btnModalNewAcc = document.querySelectorAll(".btn-show-modal");
const btnModalNewAccClose = document.querySelector(".btn--close-modal");
const modal2 = document.querySelector(".modal2");
const overlay2 = document.querySelector(".overlay2");

//Animation
const sections = document.querySelectorAll(".section");
const nav = document.querySelector(".nav");

// User seeding data
const account1 = {
  owner: "Michael Beamer",
  username: "MB",
  password: "1111",
  movements: [
    200,
    455.23,
    -306.5,
    25000,
    -642.21,
    -5533.9,
    79.97,
    1300,
    2500,
    -1100,
  ],
  interestRate: 1.2, // %
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T21:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
    "2020-09-28T22:36:17.929Z",
    "2020-02-08T14:11:59.604Z",
  ],
  currency: "EUR",
  locale: "de-DE",
};

const account2 = {
  owner: "Jessica Alba",
  username: "JA",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -300, 2600, -1200],
  interestRate: 1.5,
  password: "2222",

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
    "2020-05-25T17:49:59.371Z",
    "2020-04-26T11:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

let accounts = [account1, account2];
localStorage.setItem("localAccounts", JSON.stringify(accounts));

// Modal component

function modal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const btnShowModal = document.querySelector(".show-modal");
  const btnCloseModal = document.querySelector(".close-modal");

  function openModal() {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    modal.style.display = "block";
    document.body.classList.add("stop-scrolling");
  }

  function closeModal() {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
    modal.style.display = "none";
    document.body.classList.remove("stop-scrolling");
  }

  function closeModalWithEsc(event) {
    if (event.key === "Escape" && !modal.classList.contains("hidden"))
      closeModal();
  }

  btnShowModal.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", closeModalWithEsc);
}

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

// LogIn check and setting currentAcc

function logIn() {
  function logInCurrAcc(event) {
    event.preventDefault();

    let currentAcc = accounts.find(
      (acc) => acc.username === usernameInput.value
    );
    localStorage.setItem("currentAccLocal", JSON.stringify(currentAcc));

    if (currentAcc?.password === passwordInput.value) {
      window.location.assign("app.html");
    } else {
      alert.classList.remove("hidden");
      setTimeout(function () {
        alert.classList.add("hidden");
      }, 3000);
    }
  }

  submitFormBtn.addEventListener("click", logInCurrAcc);
}

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

// New Account modal
btnModalNewAcc.forEach((btn) => {
  btn.addEventListener("click", function () {
    modal2.classList.remove("hidden");
    overlay2.classList.remove("hidden");
    document.body.classList.add("stop-scrolling");
  });
});

btnModalNewAccClose.addEventListener("click", function () {
  overlay2.classList.add("hidden");
  modal2.classList.add("hidden");
  document.body.classList.remove("stop-scrolling");
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

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Initializes everything
function init() {
  tabsComponent();
  sliderComponent();
  modal();
  logIn();
}

init();
