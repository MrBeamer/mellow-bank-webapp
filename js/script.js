"use strict";
import slider from "./components/slider.js";
import modals from "./components/modals.js";
import tab from "./components/tab.js";
import logIn from "./components/logIn.js";
import smoothScrolling from "./components/smoothScrolling.js";
import navbarAnimation from "./components/navbarAnimation.js";

// Initializes everything
function init() {
  logIn();
  tab();
  modals();
  slider();
  smoothScrolling();
  navbarAnimation();
}

init();
