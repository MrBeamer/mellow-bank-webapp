"use strict";

const modalEle = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelector(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");

const btnModalNewAcc = document.querySelectorAll(".btn-show-modal");
const btnModalNewAccClose = document.querySelector(".btn--close-modal");
const modal2 = document.querySelector(".modal2");
const overlay2 = document.querySelector(".overlay2");

export default function modals() {
  function openModal() {
    overlay.classList.remove("hidden");
    modalEle.classList.remove("hidden");
    modalEle.style.display = "block";
    document.body.classList.add("stop-scrolling");
  }

  function closeModal() {
    overlay.classList.add("hidden");
    modalEle.classList.add("hidden");
    modalEle.style.display = "none";
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

  // New Account modal
  function openModalNewAcc() {
    modal2.classList.remove("hidden");
    overlay2.classList.remove("hidden");
    document.body.classList.add("stop-scrolling");
  }

  function closeModalNewAcc() {
    overlay2.classList.add("hidden");
    modal2.classList.add("hidden");
    document.body.classList.remove("stop-scrolling");
  }

  btnModalNewAcc.forEach((btn) => {
    btn.addEventListener("click", openModalNewAcc);
  });

  btnModalNewAccClose.addEventListener("click", closeModalNewAcc);
}
