'use strict';
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

// === вызовы фетчей в консоль ===
// fetchMovieById('496450').then(films => console.log(films));
// fetchMovieByKeyword('cat').then(films => console.log(films));
// fetchTrendingMovie().then(films => console.log(films));

// === GALLERY BLOCK === Функция рендеринга галереи

// function makeCardTrendingMovie(films) {
//   const filmCards = galleryTpl(films);
//   refs.cardContainer.insertAdjacentHTML('beforeend', filmCards);
//   refs.addError.classList.add('visually-hidden');
//   // refs.cardContainer.innerHTML = filmCards;
// }

// fetchTrendingMovie().then(makeCardTrendingMovie);

function cardsMarkUpForMovie({
  id,
  original_title,
  poster_path,
  genre_ids,
  release_date,
  vote_average,
}) {
  return `<li class="movie-gallery-item" data-item="${id}">

    <img class="movie-gallery-item-poster" src="https://image.tmdb.org/t/p/w500${poster_path}"
        alt="image card movie" data-item="${id}" />

    <div class="movie-gallery-item-description" data-item="${id}">
        <h2 class="movie-gallery-item-title" data-item="${id}">${original_title}</h2>
        <div class="movie-gallery-item-box" data-item="${id}">
            <p class="movie-gallery-item-genre" data-item="${id}">${genre_ids.reduce(
    (allGenres, id) => {
      for (const genre of genres) {
        if (id === genre.id) {
          id = genre.name;
        }
      }
      allGenres.push(id);
      // let twoGenres = [];
      if (allGenres.length > 3) {
        const twoGenres = allGenres.slice(0, 2);
        twoGenres.push('Other');
        return twoGenres;
      }
      return allGenres;
    },
    [],
  )} | ${release_date}</p>
            <span class="movie-gallery-item-rating">${vote_average}</span>
        </div>

    </div>
</li>`;
}

fetchTrendingMovie()
  .then(response => response.results)
  .then(response => {
    const cards = response.reduce((acc, film) => acc + cardsMarkUpForMovie(film), []);
    refs.cardContainer.insertAdjacentHTML('beforeend', cards);
  });
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
  event.preventDefault();

  if (event.currentTarget.query.value.trim() !== '') {
    let currentValue = event.currentTarget.query.value.trim();
    clearFilmContainer();
    startSpinner();
    refs.addError.classList.add('visually-hidden');
    fetchMovieByKeyword(currentValue).then(renderKeyWordCard).then(stopSpinner);
  } else {
    emptyQuery();
  }
  return clearInput();
}

function renderKeyWordCard(films) {
  if (films.results.length !== 0) {
    const filmCards = galleryTpl(films);
    refs.cardContainer.insertAdjacentHTML('beforeend', filmCards);
  } else {
    noResults();
    errorMessage();
  }
  // return fetchTrendingMovie().then(makeCardTrendingMovie);
}
function clearFilmContainer() {
  refs.cardContainer.innerHTML = '';
}
function clearInput() {
  refs.input.value = '';
}
// === END SEARCH MOVIE by keyword

// === PAGINATION BLOCK

// === END PAGINATION BLOCK

// === lOCALSTORAGE BLOCK
let massivFfilmsWatched = [];
let massivFfilmsQueue = [];
refs.modalCardForOneFilm.addEventListener('click', onClickInModal);
function onClickInModal(event) {
  const btnWatched = document.getElementById('add-to-watched');
  const btnAddToQueue = document.getElementById('add-to-queue');
 
  if (event.target === btnWatched) {
    const idFilmWatched = btnWatched.dataset.act;
    if (massivFfilmsWatched.includes(idFilmWatched)) {
      const indexFilm = massivFfilmsWatched.indexOf(idFilmWatched);
      massivFfilmsWatched.splice(indexFilm, 1);
    }

    massivFfilmsWatched.push(idFilmWatched);
    localStorage.setItem('watched', massivFfilmsWatched);
    btnWatched.textContent = 'delete from watched';
    
  }
  if (event.target === btnAddToQueue) {
    const idFilm = btnAddToQueue.dataset.act;
    if (massivFfilmsQueue.includes(idFilm)) {
      const indexFilm = massivFfilmsQueue.indexOf(idFilm);
      massivFfilmsQueue.splice(indexFilm, 1);
    }
    massivFfilmsQueue.push(idFilm);
    localStorage.setItem('queue', massivFfilmsQueue);
    btnAddToQueue.textContent = 'delete from Queue';
  }
}

// === END lOCALSTORAGE BLOCK
