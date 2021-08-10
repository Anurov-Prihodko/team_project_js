'use strict';
import refs from './refs';
// Переключатель темы

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const { LIGHT, DARK } = Theme;
const themeClassContainer = document.body;

themeClassContainer.classList.add(
  localStorage.getItem('theme') === null ? Theme.LIGHT : localStorage.getItem('theme'),
);
if (localStorage.getItem('theme') === Theme.DARK) {
  refs.toggleSwitch.checked = true;
}

function switchTheme(e) {
  if (e.target.checked) {
    themeClassContainer.classList.add(Theme.DARK);
    themeClassContainer.classList.remove(Theme.LIGHT);
    localStorage.setItem('theme', Theme.DARK);
  } else {
    themeClassContainer.classList.add(Theme.LIGHT);
    themeClassContainer.classList.remove(Theme.DARK);
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

refs.toggleSwitch.addEventListener('change', switchTheme, false);

// Надоедалка

import BSN from 'bootstrap.native';

const PROMPT_DELAY = 80000;
const MAX_PROMPT_ATTEMPTS = 3;
let promptCounter = 0;
let hasSubscribed = false;
const modal = new BSN.Modal('#subscription-modal');
const modalJoke = new BSN.Modal('#joke-modal');

openModal();

refs.modal.addEventListener('hide.bs.modal', openModal);
refs.subscribeBtn.addEventListener('click', onSubscribeBtnClick);

function openModal() {
  if (promptCounter === MAX_PROMPT_ATTEMPTS || hasSubscribed) {
    return;
  }

  setTimeout(() => {
    modal.show();
    promptCounter += 1;
  }, PROMPT_DELAY);

  // setTimeout(() => {
  //   const themeClassContainer = document.body;
  //   themeClassContainer.style.overflow = "visible";
  // }, 3050);
}

function onSubscribeBtnClick() {
  hasSubscribed = true;
  //   modal.hide();
  modalJoke.show();
  // const themeClassContainer = document.body;
  // themeClassContainer.style.overflow = "visible";
}

// Плавающая кнопка «наверх»

const rootElement = document.documentElement;

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

scrollToTopBtn.addEventListener('click', scrollToTop);

refs.scrollToTopBtn.addEventListener('click', scrollToTop);
