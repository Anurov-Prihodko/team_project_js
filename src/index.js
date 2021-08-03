'use strict';
const doc = document
import './sass/main.scss';
let debounce = require('lodash.debounce');

// Строка для импорта спинера, вызов startSpinner(); остановка stopSpinner();
import { startSpinner, stopSpinner } from './js/spinner/spiner';

import refs from './js/refs';
import genres from './js/genres';

import btnForLibrary from './templates/btn_for_library.hbs';
import inputHeader from './templates/input_header.hbs';
import severalFilmCard from './templates/several_film_card.hbs';
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
            <span class="movie-gallery-item-rating">${vote_average}</span>
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

// === SEARCH MOVIE by keyword
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
  // return clearInput();
}

function clearFilmContainer() {
  refs.cardContainer.innerHTML = '';
}

// === END SEARCH MOVIE by keyword

// === PAGINATION BLOCK

// === END PAGINATION BLOCK

// === lOCALSTORAGE BLOCK
let massivFfilmsWatched = [];
let massivFfilmsQueue = [];

refs.modalCardForOneFilm.addEventListener('click', onClickInModal);
function onClickInModal(event) {
  const savedFilms = localStorage.getItem('watched')
  const btnWatched = doc.getElementById('add-to-watched');
  const btnAddToQueue = doc.getElementById('add-to-queue');
  const idFilmWatched = btnWatched.dataset.act;
  const idFilmQ = btnAddToQueue.dataset.act;
  
  
  if (event.target === btnWatched && btnWatched.textContent === 'add to watched') {
    const savedFilms = localStorage.getItem('watched')
    if (savedFilms) {
      let newListFilms = []
      newListFilms.push(savedFilms)
      newListFilms.push(idFilmWatched)
      localStorage.setItem('watched', newListFilms)
      btnWatched.textContent = 'delete from watched';
      return
    }
    massivFfilmsWatched =[]
    massivFfilmsWatched.push(idFilmWatched);
    localStorage.setItem('watched', massivFfilmsWatched)
    btnWatched.textContent = 'delete from watched';
    return
  }
  if (event.target === btnWatched && btnWatched.textContent === 'delete from watched') {
    const getFilms = localStorage.getItem('watched')
    const stringForObj = getFilms.split(',')
    stringForObj.forEach((el) => {
      if (idFilmWatched === el) {
        const indexEl = stringForObj.indexOf(idFilmWatched)
        stringForObj.splice(indexEl, 1)
        localStorage.setItem('watched', stringForObj)
        btnWatched.textContent = 'add to watched'
        if (stringForObj.length === 0) {
          localStorage.removeItem('watched')
        }
      } return
      
    })

  }
   if (event.target === btnAddToQueue && btnAddToQueue.textContent==='add to queue') {
    const savedFilmsQ = localStorage.getItem('queue')
    if (savedFilmsQ) {
      let newListFilmsQ = []
      newListFilmsQ.push(savedFilmsQ)
      newListFilmsQ.push(idFilmQ)
      localStorage.setItem('queue', newListFilmsQ)
      btnAddToQueue.textContent = 'delete from queue';
      return
    }
     
    massivFfilmsQueue = []
    massivFfilmsQueue.push(idFilmQ);
    localStorage.setItem('queue', massivFfilmsQueue)
    btnAddToQueue.textContent = 'delete from queue';
    return
  }
  if (event.target === btnAddToQueue && btnAddToQueue.textContent === 'delete from queue') {
    const getFilmsQ = localStorage.getItem('queue')
    const stringForObjQ = getFilmsQ.split(',')
    stringForObjQ.forEach((el) => {
      if (idFilmQ === el) {
        const indexElQ = stringForObjQ.indexOf(idFilmQ)
        stringForObjQ.splice(indexElQ, 1)
        localStorage.setItem('queue', stringForObjQ)
        btnAddToQueue.textContent = 'add to queue'
        if (stringForObjQ.length === 0) {
          localStorage.removeItem('queue')
        }
      } return
      
    })

  }
}
    


  // === END lOCALSTORAGE BLOCK

