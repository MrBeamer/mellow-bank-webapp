"use strict";

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
const labelTimer = document.querySelector(".timer");
const closeAccBtn = document.querySelector(".form__btn--close");

//Getting local storage variables which are holding current logged in account and accounts
let currAccLocal = JSON.parse(localStorage.getItem("currentAccLocal"));
let localAccounts = JSON.parse(localStorage.getItem("localAccounts"));
let countDown;
console.log(localAccounts);

// Welcome message, shows after logging in
welcomeMessage.textContent = `Welcome back, ${
  currAccLocal.owner.split(" ")[0]
}`;

// Creates date in the right country format
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  weekday: "long",
};

labelDate.textContent = new Intl.DateTimeFormat(
  currAccLocal.locale,
  options
).format(now);

// Updates UI after changing something
function updateUi(acc) {
  displayMovements(acc);
  calcSummaryDisplay(currAccLocal);
  calcDisplayBalance(currAccLocal);
}

function formatCurrency(value, locale, currency) {
  const options = {
    style: "currency",
    currency: currency,
  };
  return new Intl.NumberFormat(locale, options).format(value);
}

// Creating new Movements and display

function displayMovements(acc, sort = false) {
  movContainer.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, index) => {
    const type = mov < 0 ? "withdrawal" : "deposit";

    const date = new Date(acc.movementsDates[index]);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const displayDate = new Intl.DateTimeFormat(acc.locale, options).format(
      date
    );

    const formattedMov = formatCurrency(
      mov,
      currAccLocal.locale,
      currAccLocal.currency
    );
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">
         ${type}
      </div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;
    movContainer.insertAdjacentHTML("afterbegin", html);
  });
}
displayMovements(currAccLocal);

// calculation of the balance and displaying it

function calcDisplayBalance(acc) {
  const balance = acc.movements.reduce((value, sum) => value + sum, 0);
  currAccLocal.balance = balance;
  labelBalance.textContent = formatCurrency(
    currAccLocal.balance,
    currAccLocal.locale,
    currAccLocal.currency
  );
}

calcDisplayBalance(currAccLocal);

// calculation of the withDrawal and deposit and displaying it
function calcSummaryDisplay(acc) {
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((value, sum) => value + sum, 0);

  labelOutcome.textContent = formatCurrency(
    Math.abs(outcomes),
    currAccLocal.locale,
    currAccLocal.currency
  );

  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((value, sum) => value + sum, 0);

  labelIncome.textContent = formatCurrency(
    Math.abs(incomes),
    currAccLocal.locale,
    currAccLocal.currency
  );

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((value, sum) => value + sum, 0);
  labelInterest.textContent = formatCurrency(
    Math.abs(interest),
    currAccLocal.locale,
    currAccLocal.currency
  );
}

calcSummaryDisplay(currAccLocal);

// Transfer money to another account

transferBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(transferAmount.value);

  const receiver = localAccounts.find(
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
    const date = new Date().toISOString();
    currAccLocal.movementsDates.push(date);
    updateUi(currAccLocal);
  }
  transferAmount.value = "";
  transferMoneyTo.value = "";
});

// Get a loan for current Account
loanBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(loanAmount.value);

  if (amount > 0 && currAccLocal.movements.some((mov) => mov >= amount * 0.1)) {
    currAccLocal.movements.push(amount);
    const date = new Date().toISOString();
    currAccLocal.movementsDates.push(date);
    updateUi(currAccLocal);
  }

  clearInterval(countDown);
  countDown = startLogoutTimer();
  loanAmount.value = "";
});

closeAccBtn.addEventListener("click", function (event) {
  event.preventDefault();
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

// Logout timer

function startLogoutTimer() {
  //setting time to 5minutes
  let timeToLogout = 300;

  const tick = () => {
    const minutes = String(Math.floor(timeToLogout / 60)).padStart(2, 0);
    const sec = String(timeToLogout % 60).padStart(2, 0);

    // when time hits 0 stop timeToLogout and logout
    if (timeToLogout == 0) {
      clearInterval(countDown);
      window.location.assign("index.html");
    }
    timeToLogout--;
    //in each callback call display remaining time to UI
    labelTimer.textContent = `${minutes}:${sec}`;
  };

  tick();
  //call timer every second
  const countDown = setInterval(tick, 1000);
  return countDown;
}

function init() {
  startLogoutTimer();
}

init();
