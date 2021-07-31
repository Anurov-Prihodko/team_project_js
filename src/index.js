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
import { noResults } from './js/notifications';
import { dotsArrayNext } from './js/pagination.js';
export { maxPAGES,  paintedDots, PAGES }

let maxPAGES = 1
let paintedDots = 5 //тут можна змінити кількість відображених цифр (має бути /2 із решьою)

let PAGES = 1 // початкова сторінка
const doc = document

//вызовы фетчей в консоль
// fetchMovieById('496450').then(films => console.log(films));
// fetchMovieByKeyword('cat').then(films => console.log(films));
// fetchTrendingMovie().then(films => console.log(films));

doc.querySelector(".pagination_list").addEventListener("click", e => {
  const event = e.path[0].textContent
  
    // console.log(event)
  // if (event === '->') following()   
  
  // else if (event === '<-') previous()   
  
      // else if(event === '...') Number(event) = PAGES
      //  if (event === '. ..' || event === '.. .') return
      if (event === '->' || event === '.. .') {
         PAGES += 3
       }
       else if (event === '. ..' || event === '<-') {
         PAGES -= 3
      }
      // else if (event === '3') {
        // console.log("event = ", event)
        // const r = doc.getElementById('mov_gall')
        // // console.log("r = ", r.remove(r))
        // r.innerHTML = '';
        // r.target.parentNode.removeChild(li);

      // }
    
  else{
      PAGES = Number(event)
      // console.log('NEW_PAGES = ', PAGES)      
  }

  doc.getElementById('mov_gall').innerHTML = '';

  fetchTrendingMovie(PAGES)
        // .then(clear_card())
    .then(makeCardTrendingMovie)
    .then(minicroRender())
        .catch(noResults);
        
});


const minicroRender = () => {
  
  const element_ul = doc.getElementById('pag_list_id')  
  element_ul.innerHTML = '';


  dotsArrayNext().map((value, index, array) => {
    // console.log(value)

    const element_li = doc.createElement('li')
    const content = doc.createTextNode(`${value}`)
    // element_li.classList = 'pagination_items'
    // if (value === '...') element_li.classList += ' noActiv'
    if (value === '. ...' || value === '... .') element_li.classList = 'pagination_items noActiv'
    else element_li.classList = 'pagination_items'

    if (value === PAGES) element_li.classList += ' center'
    element_li.appendChild(content)
    element_ul.appendChild(element_li)
  })


  return element_ul


 }

// === GALLERY BLOCK === Функция рендеринга галереи
function makeCardTrendingMovie(films) {
 
  PAGES = films.page
  maxPAGES = films.total_pages-24
  // console.log(films)
  // console.log('PAGES = ', PAGES)
  // console.log('maxPAGES = ', maxPAGES)
  // console.log("dotsArrayNext() = ", dotsArrayNext())
  // console.log("minicroRender() = ", minicroRender())

  minicroRender()
  
  // console.log("position2() = ", position2())

  ////////////////
  const filmCards = galleryTpl(films);
  refs.cardContainer.insertAdjacentHTML('beforeend', filmCards);
  // refs.cardContainer.innerHTML = filmCards;
}

fetchTrendingMovie().then(makeCardTrendingMovie).catch(noResults);

// noResults(); ВЫЗЫВАЕТ НОТУ О ОШИБКЕ

// === END GALLERY BLOCK

// === PAGINATION BLOCK

// === END PAGINATION BLOCK
import pagination from './js/pagination.js';

// === lOCALSTORAGE BLOCK

// === END lOCALSTORAGE BLOCK
