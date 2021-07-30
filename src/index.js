'use strict';
import './sass/main.scss';
let debounce = require('lodash.debounce');

import genres from './genres.json';
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
// import NOTE from './js/notifications';

// Уведомление об ошибке (pnotify)
// import '@pnotify/core/dist/BrightTheme.css';
// import { error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';

// Функция рендеринга галереи
function makeCardTrendingMovie(films) {
  const filmCards = galleryTpl(films);
  refs.cardContainer.insertAdjacentHTML('beforeend', filmCards);
  refs.addError.classList.add('is-hidden');
  // refs.cardContainer.innerHTML = filmCards;
}

fetchTrendingMovie().then(makeCardTrendingMovie).catch(errorMessage);

function errorMessage() {
  // error({
  //   text: 'ERROR 404 NOT FOUND',
  //   delay: 5000,
  // });
  refs.cardContainer.innerHTML = '';
  refs.addError.classList.remove('is-hidden');
}

//вызовы фетчей в консоль
// fetchMovieById('496450').then(films => console.log(films));
// fetchMovieByKeyword('cat').then(films => console.log(films));
// fetchTrendingMovie().then(films => console.log(films));
//
// === GALLERY BLOCK

// === END GALLERY BLOCK

// === PAGINATION BLOCK

// === END PAGINATION BLOCK

// === lOCALSTORAGE BLOCK

// === END lOCALSTORAGE BLOCK
