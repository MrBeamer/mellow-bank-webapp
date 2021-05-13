"use strict";

import { accounts } from "./seed.js";

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const submitFormBtn = document.querySelector(".btn-submit");
const alert = document.querySelector(".alert");

export default function logIn() {
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
