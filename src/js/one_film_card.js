'use strict';
import filmTpl from '../templates/one_film_card.hbs';
import { fetchMovieById } from './api_service';
import refs from './refs';

//1. По умолчанию на <div class="backdrop-movie-card> висит класс visually-hidden
//2. При клике на <ul class="movie-gallery-list"> класс visually-hidden убирается
//3. Отрисовывается модалка
//4. По нажатию на Esc и клику на крестик добавляется класс visually-hidden и модалка скрывается

refs.cardContainer.addEventListener('click', onMovieCardClick); //тут слушатель на галерее.
/* нам нужно отлавливать event.target, брать у него id (берём id дата атрубута тега, 
 на который кликнул пользователь) и прокидывть его в fetchMovieById */

/*Создаёт разметку карточки по шаблону*/
function renderModalMovieCard(data) {
  const storageStatus = { queue: false, watched: false };
  if (localStorage.getItem('queue')?.indexOf(data.id + '') >= 0) {
    storageStatus.queue = true;
  }
  if (localStorage.getItem('watched')?.indexOf(data.id + '') >= 0) {
    storageStatus.watched = true;
  }
  const card = filmTpl({ filmData: data, storageStatus });
  refs.modalMovieCardContainer.insertAdjacentHTML('beforeend', card);
  

}

function clearModalMovieCard() {
  refs.modalMovieCardContainer.innerHTML = '';
}

/* Снимаем visually-hidden с модалки при клике на карточку фильма в галерее */
function onMovieCardClick(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }

  const id = event.target.getAttribute('data-item');
  localStorage.setItem('current card', id); //! зловили картку
  addEventListenerOnEscKey();
  addEventListenerOnModalBackdrop();

  fetchMovieById(id).then(renderModalMovieCard);

  refs.movieCardBackdrop.classList.remove('visually-hidden');
  refs.body.classList.add('scroll-hidden');
}

/* Закрываем модалку при клике на бэкдроп или кнопку закрытия */
function onMovieCardBackdropClick(event) {
  if (!event.target.hasAttribute('data-close')) {
    return;
  }

  removeEventListenerFromBackdrop();
  removeEventListenerFromEscKey();

  refs.movieCardBackdrop.classList.add('visually-hidden');
  refs.body.classList.remove('scroll-hidden');
  clearModalMovieCard();
}

/* Закрываем модалку при нажатии клавиши Esc на клавиатуре */
function onEscPress(event) {
  if (event.keyCode !== 27) {
    return;
  }

  removeEventListenerFromBackdrop();
  removeEventListenerFromEscKey();
  refs.movieCardBackdrop.classList.add('visually-hidden');
  clearModalMovieCard();
}

/* Функции повесить/снять слушатели событий при открытии/закрытии модалки */

function addEventListenerOnModalBackdrop() {
  refs.movieCardBackdrop.addEventListener('click', onMovieCardBackdropClick);
}

function removeEventListenerFromBackdrop() {
  refs.movieCardBackdrop.removeEventListener('click', onMovieCardBackdropClick);
}

function addEventListenerOnEscKey() {
  window.addEventListener('keydown', onEscPress);
}

function removeEventListenerFromEscKey() {
  window.removeEventListener('keydown', onEscPress);
}
