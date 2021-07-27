'use strict';
import './sass/main.scss';
let debounce = require('lodash.debounce');

import genres from './genres.json';

import btnForLibrary from './templates/btn_for_library.hbs';
import inputHeader from './templates/input_header.hbs';
import severalFilmCard from './templates/several_film_card.hbs';
import oneFilmCard from './templates/one_film_card.hbs';
import { fetchMovieByKeyword, fetchMovieById, fetchTrendingMovie } from './js/api_service';
import toggleSwitch from './js/toggleSwitch.js';
import headerButtons from './js/header_buttons.js';
import * as ourTeam from './js/our-team'
// import NOTE from './js/notifications';

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
