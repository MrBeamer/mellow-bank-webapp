"use strict";

// Selected elements
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".operations__tab");

  //Remove active classes
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));

  //Add active class
  clicked.classList.add("operations__tab--active");

  //Activate active content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");

  console.log(clicked);
});
