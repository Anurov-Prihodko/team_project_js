'use strict';
import './sass/main.scss';
let debounce = require('lodash.debounce');

// import genres from './genres.json';
import refs from './js/refs';

import btnForLibrary from './templates/btn_for_library.hbs';
import inputHeader from './templates/input_header.hbs';
import severalFilmCard from './templates/several_film_card.hbs';
import oneFilmCard from './templates/one_film_card.hbs';
import galleryTpl from './templates/movie_gallery.hbs';
import { fetchMovieByKeyword, fetchMovieById, fetchTrendingMovie } from './js/api_service';
import toggleSwitch from './js/toggleSwitch.js';
import headerButtons from './js/header_buttons.js';
import * as ourTeam from './js/our-team';
import { noResults, emptyQuery } from './js/notifications';

//вызовы фетчей в консоль
// fetchMovieById('496450').then(films => console.log(films));
// fetchMovieByKeyword('cat').then(films => console.log(films));
// fetchTrendingMovie().then(films => console.log(films));

// === GALLERY BLOCK === Функция рендеринга галереи
function makeCardTrendingMovie(films) {
  const filmCards = galleryTpl(films);
  refs.cardContainer.insertAdjacentHTML('beforeend', filmCards);
  // refs.cardContainer.innerHTML = filmCards;
}

fetchTrendingMovie().then(makeCardTrendingMovie).catch(noResults);

// noResults(); ВЫЗЫВАЕТ НОТУ О ОШИБКЕ

// === END GALLERY BLOCK
// SEARCH MOVIE
refs.searchInput.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  if (event.currentTarget.query.value.trim() !== '') {
    let currentValue = event.currentTarget.query.value.trim();
    clearFilmContainer();
    fetchMovieByKeyword(currentValue).then(makeCardTrendingMovie);
  } else {
    emptyQuery();
  }
  return clearInput();
}

// console.log(noResults());
// function onSearch(event) {
//   event.preventDefault();

//   const keyword = event.currentTarget.query.value;

//   console.log(keyword);
//   if (!keyword) {
//     refs.notification.textContent =
//       'Search result not successfull. Enter correct movie name and try again';
//     return;
//   }

function clearFilmContainer() {
  refs.cardContainer.innerHTML = '';
}
function clearInput() {
  refs.input.value = '';
}
// === PAGINATION BLOCK

// === END PAGINATION BLOCK

// === lOCALSTORAGE BLOCK

// === END lOCALSTORAGE BLOCK
