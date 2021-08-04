'use strict';
import './sass/main.scss';
let debounce = require('lodash.debounce');

// Строка для импорта спинера, вызов startSpinner(); остановка stopSpinner();
import { startSpinner, stopSpinner } from './js/spinner/spiner';

import refs from './js/refs';
import genres from './js/genres';

import oneFilmCard from './templates/one_film_card.hbs';
import galleryTpl from './templates/movie_gallery.hbs';
import { fetchMovieByKeyword, fetchMovieById, fetchTrendingMovie } from './js/api_service';
import toggleSwitch from './js/toggle_switch.js';
import headerButtons from './js/header_buttons.js';
import * as ourTeam from './js/our_team';
import { noResults, emptyQuery } from './js/notifications';
import oneFilmCardJs from './js/one_film_card';
import watchAndQueueFromStorage from './js/watch_queue_render_func';
//mark
import { miniRender } from './js/pagination.js';
export { maxPAGES, paintedDots, PAGES, KeyAlpha };
export { realLaunch, threeSearch };
let KeyAlpha = '';
let maxPAGES = 1;
let paintedDots = 5; //тут можна змінити кількість відображених цифр (має бути /2 із решьою)
let PAGES = 1; // початкова сторінка
////

// === вызовы фетчей в консоль ===
// fetchMovieById('496450').then(films => console.log(films));
// fetchMovieByKeyword('cat').then(films => console.log(films));
// fetchTrendingMovie().then(films => console.log(films));

// === GALLERY BLOCK === Функция рендеринга галереи
function cardsMarkUpForMovie({
  id,
  original_title,
  poster_path,
  genre_ids,
  release_date,
  vote_average,
}) {
  // логіка
  id = id ? id : 'Technical works are underway!';
  original_title = original_title ? original_title : 'not yet announced';
  poster_path = poster_path ? `image.tmdb.org/t/p/w500/${poster_path}` : 'placeimg.com/270/340/any';
  vote_average = vote_average ? vote_average : '--/--';
  release_date = release_date
    ? release_date.substring(0, release_date.length - 6)
    : 'Year not yet specified';
  genre_ids = genre_ids.reduce(
    (allGenres, id) => {
      for (const genre of genres) {
        if (id === genre.id) {
          id = genre.name;
        }
      }
      allGenres.push(' ' + id);
      // let twoGenres = [];
      if (allGenres.length > 3) {
        const twoGenres = allGenres.slice(0, 2);
        twoGenres.push(' ' + 'Other');
        return twoGenres;
      }
      return allGenres;
    },

    [],
  );

  //конструктор
  return `<li class="movie-gallery-item" data-item="${id}">
        <img class="movie-gallery-item-poster" src="https://${poster_path}"
        alt="image card movie" data-item="${id}" />
    <div class="movie-gallery-item-description" data-item="${id}">
        <h2 class="movie-gallery-item-title" data-item="${id}">${original_title}</h2>
        <div class="movie-gallery-item-box" data-item="${id}">
            <p class="movie-gallery-item-genre" data-item="${id}">${genre_ids} | ${release_date}</p>
            <span class="movie-gallery-item-rating" data-item="${id}">${vote_average}</span>
        </div>
    </div>
</li>`;
}

const autoIn = arrey => {
  PAGES = arrey.page;
  maxPAGES = arrey.total_pages;
  miniRender();
  // console.log(PAGES)
  // console.log(maxPAGES)
  return arrey;
};

const realLaunch = (pag = 1) => {
  fetchTrendingMovie(pag)
    .then(r => autoIn(r, ''))
    .then(response => response.results)
    .then(response => {
      const cards = response.reduce((acc, film) => acc + cardsMarkUpForMovie(film), []);
      refs.cardContainer.insertAdjacentHTML('beforeend', cards);
    });
  // .then(miniRender(PAGES))
};

realLaunch();

// ВЫЗЫВАЕТ НОТУ О ОШИБКЕ
// noResults();

function errorMessage() {
  refs.cardContainer.innerHTML = '';
  refs.addError.classList.remove('visually-hidden');
}
// === END GALLERY BLOCK

// === SEARCH MOVIE by keyword BLOCK
refs.searchInput.addEventListener('submit', onSearch);

function onSearch(event) {
  threeSearch(twoSearch(event));
}

function twoSearch(event) {
  event.preventDefault();
  if (event.currentTarget.query.value.trim() !== '')
    KeyAlpha = event.currentTarget.query.value.trim();
  else emptyQuery();
  refs.input.value = '';
  return KeyAlpha;
}

function threeSearch(currentValue, p) {
  clearFilmContainer();
  startSpinner();
  refs.addError.classList.add('visually-hidden');
  fetchMovieByKeyword(currentValue, p)
    .then(r => autoIn(r, currentValue))
    .then(response => response.results)
    .then(response => {
      if (response.length !== 0) {
        const cards = response.reduce((acc, film) => acc + cardsMarkUpForMovie(film), []);
        refs.cardContainer.insertAdjacentHTML('beforeend', cards);
      } else {
        noResults();
        errorMessage();
      }
    })
    .then(stopSpinner);

  return;
}

function clearFilmContainer() {
  refs.cardContainer.innerHTML = '';
}
// === END SEARCH MOVIE by keyword BLOCK

// === lOCALSTORAGE BLOCK
let massivFfilmsWatched = [];
let massivFfilmsQueue = [];

refs.modalCardForOneFilm.addEventListener('click', onClickInModal);
function onClickInModal(event) {
  const savedFilms = localStorage.getItem('watched');
  const btnWatched = document.getElementById('add-to-watched');
  const btnAddToQueue = document.getElementById('add-to-queue');

  //const getMassivFfilmsWatchedFromLocal = localStorage.getItem('watched')
  const filmId = btnWatched.dataset.act;
  // console.log(localStorage.getItem('watched'));
  if (event.target === btnWatched && localStorage.getItem('watched')?.indexOf(filmId + '') > -1) {
    const indexFilm = massivFfilmsWatched.indexOf(filmId);
    // console.log(massivFfilmsWatched);
    massivFfilmsWatched.splice(indexFilm, 1);
    localStorage.setItem('watched', massivFfilmsWatched);
    btnWatched.textContent = 'add to watched';
  } else if (event.target === btnWatched) {
    const filmId = btnWatched.dataset.act;
    massivFfilmsWatched.push(filmId);
    localStorage.setItem('watched', massivFfilmsWatched);
    btnWatched.textContent = 'delete from watched';
  }

  if (event.target === btnAddToQueue && localStorage.getItem('queue')?.indexOf(filmId + '') > -1) {
    console.log('test 1');
    const indexFilm = massivFfilmsQueue.indexOf(filmId);
    console.log(massivFfilmsQueue);
    massivFfilmsQueue.splice(indexFilm, 1);
    localStorage.setItem('queue', massivFfilmsQueue);
    btnAddToQueue.textContent = 'add to queue';
    
  } else if (event.target === btnAddToQueue) {
    const filmId = btnWatched.dataset.act;
    massivFfilmsQueue.push(filmId);
    localStorage.setItem('queue', massivFfilmsQueue);
    btnAddToQueue.textContent = 'delete from queue';
    console.log('test 2');
  }
}
// === END lOCALSTORAGE BLOCK
