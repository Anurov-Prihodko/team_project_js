'use strict';
import './sass/main.scss';
let debounce = require('lodash.debounce');

// Строка для импорта спинера, вызов startSpinner(); остановка stopSpinner();
import { startSpinner, stopSpinner } from "./js/spinner/spiner";

// import genres from './genres.json';
import refs from './js/refs';

import btnForLibrary from './templates/btn_for_library.hbs';
import inputHeader from './templates/input_header.hbs';
import severalFilmCard from './templates/several_film_card.hbs';
import oneFilmCard from './templates/one_film_card.hbs';
import galleryTpl from './templates/movie_gallery.hbs';
import { fetchMovieByKeyword, fetchMovieById, fetchTrendingMovie } from './js/api_service';
import toggleSwitch from './js/toggle_switch.js';
import headerButtons from './js/header_buttons.js';
import * as ourTeam from './js/our-team';
import { noResults, emptyQuery } from './js/notifications';

// === вызовы фетчей в консоль ===
// fetchMovieById('496450').then(films => console.log(films));
// fetchMovieByKeyword('cat').then(films => console.log(films));
// fetchTrendingMovie().then(films => console.log(films));

// === GALLERY BLOCK === Функция рендеринга галереи

function makeCardTrendingMovie(films) {
  
  const filmCards = galleryTpl(films);
  refs.cardContainer.insertAdjacentHTML('beforeend', filmCards);
  // refs.cardContainer.innerHTML = filmCards;

}
  
fetchTrendingMovie().then(makeCardTrendingMovie);

// noResults(); ВЫЗЫВАЕТ НОТУ О ОШИБКЕ

// === END GALLERY BLOCK
// SEARCH MOVIE by keyword
refs.searchInput.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  if (event.currentTarget.query.value.trim() !== '') {
    let currentValue = event.currentTarget.query.value.trim();
    clearFilmContainer();
    startSpinner();
    fetchMovieByKeyword(currentValue).then(renderKeyWordCard)
      .then(stopSpinner);
   
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
  }
  return fetchTrendingMovie().then(makeCardTrendingMovie);
}
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

