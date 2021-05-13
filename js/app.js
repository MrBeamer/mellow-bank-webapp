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
const [notActiveAcc] = localAccounts.filter(
  (acc) => acc.username !== currAccLocal.username
);
const accounts = [currAccLocal, notActiveAcc];
console.log(notActiveAcc);
console.log(accounts);

let countDown;

// Welcome message, shows after logging in

function displayWelcomeMsg() {
  welcomeMessage.textContent = `Welcome back, ${
    accounts[0].owner.split(" ")[0]
  }`;
}

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
  accounts[0].locale,
  options
).format(now);

// Updates UI after changing something

function updateUi(acc) {
  displayMovements(acc);
  calcSummaryDisplay(accounts[0]);
  calcDisplayBalance(accounts[0]);
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
      accounts[0].locale,
      accounts[0].currency
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
displayMovements(accounts[0]);

// calculation of the balance and displaying it

function calcDisplayBalance(acc) {
  const balance = acc.movements.reduce((value, sum) => value + sum, 0);
  accounts[0].balance = balance;
  labelBalance.textContent = formatCurrency(
    accounts[0].balance,
    accounts[0].locale,
    accounts[0].currency
  );
}

calcDisplayBalance(accounts[0]);

// Calculation of the withDrawal and deposit and displaying it

function calcSummaryDisplay(acc) {
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((value, sum) => value + sum, 0);

  labelOutcome.textContent = formatCurrency(
    Math.abs(outcomes),
    accounts[0].locale,
    accounts[0].currency
  );

  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((value, sum) => value + sum, 0);

  labelIncome.textContent = formatCurrency(
    Math.abs(incomes),
    accounts[0].locale,
    accounts[0].currency
  );

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((value, sum) => value + sum, 0);
  labelInterest.textContent = formatCurrency(
    Math.abs(interest),
    accounts[0].locale,
    accounts[0].currency
  );
}

calcSummaryDisplay(accounts[0]);

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
    accounts[0].balance >= amount &&
    receiver?.username !== accounts[0].username
  ) {
    receiver.movements.push(amount);
    accounts[0].movements.push(-amount);
    const date = new Date().toISOString();
    accounts[0].movementsDates.push(date);
    accounts[1].movementsDates.push(date);
    localStorage.setItem("updatedAccounts", JSON.stringify(accounts)); //updates local storage
    updateUi(accounts[0]);
  }
  transferAmount.value = "";
  transferMoneyTo.value = "";
});

// Get a loan for current Account

loanBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(loanAmount.value);

  if (amount > 0 && accounts[0].movements.some((mov) => mov >= amount * 0.1)) {
    accounts[0].movements.push(amount);
    const date = new Date().toISOString();
    accounts[0].movementsDates.push(date);
    localStorage.setItem("updatedAccounts", JSON.stringify(accounts)); //updates local storage
    updateUi(accounts[0]);
  }

  clearInterval(countDown);
  countDown = startLogoutTimer();
  loanAmount.value = "";
});

closeAccBtn.addEventListener("click", function (event) {
  event.preventDefault();
});

let sorted = false;
sortBtn.addEventListener("click", function (event) {
  event.preventDefault();
  displayMovements(accounts[0], !sorted);
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
    //in each call display remaining time to UI
    labelTimer.textContent = `${minutes}:${sec}`;
  };

  tick();
  //call timer every second
  const countDown = setInterval(tick, 1000);
  return countDown;
}

function init() {
  startLogoutTimer();
  displayWelcomeMsg();
}

init();
