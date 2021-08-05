'use strict';
import ourTeamCards from '../photos.json';
import ourTeamTemplate from '../templates/our_team_cards';
import refs from './refs';

refs.linkToOurTeam.addEventListener('click', onOurTeamLinkClick);

function renderOurTeamCards(info) {
  const cards = ourTeamTemplate(info);
  refs.ourTeamList.insertAdjacentHTML('beforeend', cards);
}

function clearTeamMemberCards() {
  refs.ourTeamList.innerHTML = '';
}

/* Снимаем visually-hidden с модалки при клике на GoIT Students */
function onOurTeamLinkClick(event) {
  event.preventDefault();
  addEventListenerOnEscKey();
  addEventListenerOnBackdrop();

  renderOurTeamCards(ourTeamCards);
  refs.body.classList.add('scroll-hidden');
  refs.backdrop.classList.remove('visually-hidden');
  
}

/* Закрываем модалку при клике на бэкдроп или кнопку закрытия */
function onbackdropClick(event) {
  if (!event.target.hasAttribute('data-close-tag')) {
    return;
  }

  removeEventListenerFromBackdrop();
  removeEventListenerFromEscKey();
  refs.backdrop.classList.add('visually-hidden');
  refs.body.classList.remove('scroll-hidden');
  clearTeamMemberCards();
}

/* Закрываем модалку при нажатии клавиши Esc на клавиатуре */
function onEscClick(event) {
  if (event.keyCode !== 27) {
    return;
  }

  removeEventListenerFromBackdrop();
  removeEventListenerFromEscKey();
  refs.backdrop.classList.add('visually-hidden');
  clearTeamMemberCards();
}

/* Функции повесить/снять слушатели событий при открытии/закрытии модалки */

function addEventListenerOnBackdrop() {
  refs.backdrop.addEventListener('click', onbackdropClick);
}

function removeEventListenerFromBackdrop() {
  refs.backdrop.removeEventListener('click', onbackdropClick);
}

function addEventListenerOnEscKey() {
  window.addEventListener('keydown', onEscClick);
}

function removeEventListenerFromEscKey() {
  window.removeEventListener('keydown', onEscClick);
}
