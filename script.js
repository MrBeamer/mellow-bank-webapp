"use strict";

// not finished refactored / split to modules

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

// Fake user seeding data
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

const accounts = [account1, account2];
// localStorage.setItem("localAccounts", JSON.stringify(accounts));
// let localAccounts = JSON.parse(localStorage.getItem("localAccounts"));
// console.log(localAccounts);
// console.log(localAccounts.forEach((acc) => console.log(acc)));

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
  }

  function closeModal() {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
    modal.style.display = "none";
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

// Login
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const submitFormBtn = document.querySelector(".btn-submit");
const alert = document.querySelector(".alert");

// App
const welcomeMessage = document.querySelector(".welcome-message");
const labelDate = document.querySelector(".date");
const movContainer = document.querySelector(".movements");
const operationBtn = document.querySelector(".operation__btn");
const labelBalance = document.querySelector(".balance__value");
const labelIncome = document.querySelector(".summary__value--in");
const labelOutcome = document.querySelector(".summary__value--out");
const labelInterest = document.querySelector(".summary__value--interest");
const transferMoneyTo = document.querySelector(".form__input--to");
const transferAmount = document.querySelector(".form__input--amount");
const transferBtn = document.querySelector(".form__btn--transfer");
const loanBtn = document.querySelector(".form__btn--loan");
const loanAmount = document.querySelector(".form__input--loan");
const closeBtn = document.querySelector(".form__btn--close");
const sortBtn = document.querySelector(".btn--sort");
// LogIn check and setting currentAcc
// let currentAcc;

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

// Initializes everything
function init() {
  if (document.body.contains(tabsContainer)) {
    tabsComponent();
    sliderComponent();
    modal();
    logIn();
  } else {
    console.log("Not loading init");
  }
}

init();

// App Javascript - after login

//Creating local storage variable which holds current logged in account
let currAccLocal = JSON.parse(localStorage.getItem("currentAccLocal"));

// Welcome message shows after logging  in
welcomeMessage.textContent = `Welcome back, ${
  currAccLocal.owner.split(" ")[0]
}`;

// Creates date in the right country format
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  weekday: "long",
};

labelDate.textContent = new Intl.DateTimeFormat(
  currAccLocal.locale,
  options
).format(now);

// creating new Movements and display

function displayMovements(acc, sort = false) {
  movContainer.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, index) => {
    const type = mov < 0 ? "withdrawal" : "deposit";

    const date = new Date(acc.movementsDates[index]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">
       ${type}
    </div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov.toFixed(2)}€</div>
  </div>`;
    movContainer.insertAdjacentHTML("afterbegin", html);
  });
}
displayMovements(currAccLocal);

// calculation of the balance and displaying it

function calcDisplayBalance(acc) {
  const balance = acc.movements.reduce((value, sum) => value + sum, 0);
  currAccLocal.balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)}€`;
}

calcDisplayBalance(currAccLocal);

// calculation of the withDrawal and deposit and displaying it
function calcSummaryDisplay(acc) {
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((value, sum) => value + sum, 0);

  labelOutcome.textContent = `${Math.abs(outcomes.toFixed(2))}€`;

  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((value, sum) => value + sum, 0);

  labelIncome.textContent = `${incomes.toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((value, sum) => value + sum, 0);
  labelInterest.textContent = `${interest.toFixed(2)}€`;
}

calcSummaryDisplay(currAccLocal);

// Transfer money to another account

transferBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(transferAmount.value);

  const receiver = accounts.find(
    (acc) => acc.username === transferMoneyTo.value
  );

  if (
    amount > 0 &&
    receiver &&
    currAccLocal.balance >= amount &&
    receiver?.username !== currAccLocal.username
  ) {
    receiver.movements.push(amount);
    currAccLocal.movements.push(-amount);
    updateUi(currAccLocal);
  }
  transferAmount.value = "";
  transferMoneyTo.value = "";
});

// Get a loan for current Account
loanBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(loanAmount.value);
  currAccLocal.movements.push(amount);
  const date = new Date().toISOString();
  currAccLocal.movementsDates.push(date);
  updateUi(currAccLocal);
  loanAmount.value = "";
});

// sort movemnets

let sorted = false;
sortBtn.addEventListener("click", function (event) {
  event.preventDefault();
  displayMovements(currAccLocal, !sorted);
  sorted = !sorted;
  sorted
    ? (sortBtn.innerHTML = `&uarr; SORT`)
    : (sortBtn.innerHTML = `&darr; SORT`);
});

// update UI after changing something

function updateUi(acc) {
  displayMovements(acc);
  calcSummaryDisplay(currAccLocal);
  calcDisplayBalance(currAccLocal);
}
