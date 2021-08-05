'use strict';
import refs from './refs';

function onClickLib() {
  refs.searchInput.classList.add('visually-hidden');
  refs.btnList.classList.remove('visually-hidden');
  refs.libButton.classList.add('current');
  refs.homeButton.classList.remove('current');
  refs.headerDom.classList.add('lib-header');
}
function onClickHome() {
  refs.searchInput.classList.add('visually-hidden');
  refs.btnList.classList.remove('visually-hidden');
  refs.libButton.classList.remove('current');
  refs.homeButton.classList.add('current');
  refs.headerDom.classList.remove('lib-header');
}

function onClickLibBtnWatched() {
  refs.watchedButton.classList.add('active');
  refs.queueButton.classList.remove('active');
}
function onClickLibBtnQueue() {
  refs.watchedButton.classList.remove('active');
  refs.queueButton.classList.add('active');
}

refs.libButton.addEventListener('click', onClickLib);
refs.homeButton.addEventListener('click', onClickHome);
refs.watchedButton.addEventListener('click', onClickLibBtnWatched);
refs.queueButton.addEventListener('click', onClickLibBtnQueue);
