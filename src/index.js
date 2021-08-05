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
const doc = document;


try {
  const q = localStorage.getItem('queue').split(',').indexOf('')
  const w = localStorage.getItem('watched').split(',').indexOf('')

  // я горжуся що зміг полічити цей баг проявляєтся якщо в queue або watched поставити лишню кому на початку. цей баг я сам породив коли криво реалізував видалення останього елементу через localStorage.setItem('position', '')
  if (w === 0 || q === 0) {
    setTimeout(() => console.log('повідомлння від <Terminator>'), 600)
    setTimeout(() => console.log('                                    Приймете... ?'), 3200)
    setTimeout(() => {
      console.log('помилка localStorage : ушкодженs данні під ключами :')
      console.log('')
      console.log(`        || 'queue' = ${q}  || 'watched' = ${w} ||`)

    }, 7200)
    setTimeout(() => console.log('reboot... .'), 9000) 

    falsh()
  }
  
} catch {
  localStorage.removeItem('position')
  localStorage.removeItem('queue')
  localStorage.removeItem('watched')
  localStorage.removeItem('current card')
}

// localStorage.setItem('position', '')
// doc.getElementById(beginning)
doc.getElementById('beginning').addEventListener('click', beginningOne);

function beginningOne () {
  localStorage.removeItem('position')
  localStorage.removeItem('home page main')
  // localStorage.setItem('position', '')
  // localStorage.setItem('home page main', '')
}





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
  PAGES = arrey.page
  maxPAGES = arrey.total_pages
  const pagItem = localStorage.getItem('home page main')

  if (!pagItem) localStorage.setItem('home page main', PAGES)
  miniRender()
  return arrey
};

const realLaunch = (pag = 1) => {
  fetchTrendingMovie(pag)
    .then(r => autoIn(r, ''))
    .then(response => response.results)
    .then(response => {
      const cards = response.reduce((acc, film) => acc + cardsMarkUpForMovie(film), []);
      refs.cardContainer.insertAdjacentHTML('beforeend', cards)
    });
};

const PG = localStorage.getItem('home page main')
// console.log(PG)
if (PG) {
  localStorage.removeItem('position')
  // localStorage.setItem('position', '')
  realLaunch(Number(PG))

}
else {
  // localStorage.setItem('position', '')
  localStorage.removeItem('position')
  realLaunch()
}

// ВЫЗЫВАЕТ НОТУ О ОШИБКЕ
// noResults();

function errorMessage() {
  refs.cardContainer.innerHTML = ''
  refs.addError.classList.remove('visually-hidden')
}
// === END GALLERY BLOCK

// === SEARCH MOVIE by keyword BLOCK
refs.searchInput.addEventListener('submit', onSearch)

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
let massivFfilmsWatched = localStorage.getItem('watched') === null ? [] : localStorage.getItem('watched').split(',')
let massivFfilmsQueue = localStorage.getItem('queue') === null ? [] : localStorage.getItem('queue').split(',')


refs.modalCardForOneFilm.addEventListener('click', onClickInModal);
function onClickInModal(event) {
  const savedFilms = localStorage.getItem('watched');
  const btnWatched = doc.getElementById('add-to-watched');
  const btnAddToQueue = doc.getElementById('add-to-queue');

  const filmId = btnWatched.dataset.act;
  if (event.target === btnWatched && localStorage.getItem('watched')?.indexOf(filmId + '') > -1) {

    const indexFilm = massivFfilmsWatched.indexOf(filmId);

    massivFfilmsWatched.splice(indexFilm, 1);
    localStorage.setItem('watched', massivFfilmsWatched);


    if (massivFfilmsWatched.length === 0) {
      localStorage.removeItem('watched')
      if (localStorage.getItem('position') === 'watched') doc.querySelector('.library-is-empty').classList.remove('visually-hidden')     
    }
    
    btnWatched.textContent = 'add to watched';

    //mark//
    const position = localStorage.getItem('position');
    if (position === 'watched') {
      doc.getElementById(localStorage.getItem('current card')).remove();
    }

    
    //mark//
  } else if (event.target === btnWatched) {
    const filmId = btnWatched.dataset.act;
    massivFfilmsWatched.push(filmId);
    localStorage.setItem('watched', massivFfilmsWatched);
    btnWatched.textContent = 'delete from watched';
  }

  if (event.target === btnAddToQueue && localStorage.getItem('queue')?.indexOf(filmId + '') > -1) {
    const indexFilm = massivFfilmsQueue.indexOf(filmId);
    massivFfilmsQueue.splice(indexFilm, 1);
    
    
    
    localStorage.setItem('queue', massivFfilmsQueue);
    if (massivFfilmsQueue.length === 0) {
      localStorage.removeItem('queue')
        if (localStorage.getItem('position') === 'queue') 
          doc.querySelector('.library-is-empty').classList.remove('visually-hidden')
    }
    btnAddToQueue.textContent = 'add to queue';
    //mark//
    const position = localStorage.getItem('position');
    if (position === 'queue') {
      doc.getElementById(localStorage.getItem('current card')).remove();
    }
    //mark//
  } else if (event.target === btnAddToQueue) {
    const filmId = btnWatched.dataset.act;
    massivFfilmsQueue.push(filmId);
    localStorage.setItem('queue', massivFfilmsQueue);    
    btnAddToQueue.textContent = 'delete from queue';
  }
}
// === END lOCALSTORAGE BLOCK

