'use strict';
import refs from './refs';

const doc = document,
 LIGHT = 'light-theme',
 DARK = 'dark-theme',
 themeClassContainer = doc.body.classList;
// const pag_mark = doc.getElementById("pag_list_id").classList

themeClassContainer.add(
  localStorage.getItem('theme') === null ? LIGHT : localStorage.getItem('theme'),
);
if (localStorage.getItem('theme') === DARK) {
  refs.toggleSwitch.checked = true;
}

function switchTheme(e) {
  if (e.target.checked) {
    // pag_mark.add('dark')
    // pag_mark.remove('light')

    themeClassContainer.add(DARK);
    themeClassContainer.remove(LIGHT);

    localStorage.setItem('theme', DARK);
  } else {
    // pag_mark.add('light')
    // pag_mark.remove('dark')    

    themeClassContainer.add(LIGHT);
    themeClassContainer.remove(DARK);

    localStorage.setItem('theme', LIGHT);
  }
}

refs.toggleSwitch.addEventListener('change', switchTheme, false);

// Надоедалка

// import BSN from 'bootstrap.native';

// const PROMPT_DELAY = 3000;
// const MAX_PROMPT_ATTEMPTS = 3;
// let promptCounter = 0;
// let hasSubscribed = false;
// const modal = new BSN.Modal('#subscription-modal');
// const modalJoke = new BSN.Modal('#joke-modal');

// openModal();

// refs.modal.addEventListener('hide.bs.modal', openModal);
// refs.subscribeBtn.addEventListener('click', onSubscribeBtnClick);

// function openModal() {
//   if (promptCounter === MAX_PROMPT_ATTEMPTS || hasSubscribed) {
//     console.log('Максимальное кол-во надоеданий или подписался');
//     return;
//   }

//   setTimeout(() => {
//     // console.log('Открываем надоедалку');
//     modal.show();
//     promptCounter += 1;
//   }, PROMPT_DELAY);

//   setTimeout(() => {
//     const themeClassContainer = doc.body;
//     themeClassContainer.style.overflow = "visible";
//   }, 3050);
// }

// function onSubscribeBtnClick() {
//   hasSubscribed = true;
//   //   modal.hide();
//   modalJoke.show();
//   const themeClassContainer = doc.body;
//   themeClassContainer.style.overflow = "visible";
// }

// Плавающая кнопка «наверх»

const rootElement = doc.documentElement;

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

scrollToTopBtn.addEventListener('click', scrollToTop);

refs.scrollToTopBtn.addEventListener('click', scrollToTop);
