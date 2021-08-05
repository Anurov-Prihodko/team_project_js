'use strict';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '980aef4f6602bffaf56ce8d4b0805479';
export { fetchMovieByKeyword, fetchMovieById, fetchTrendingMovie };

function fetchMovieByKeyword(keyword, page = 1) {
  // let page = 1;
  return fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${keyword}&page=${page}`).then(
    response => response.json(),
  );
}
function fetchMovieById(filmId) {
  return fetch(`${BASE_URL}movie/${filmId}?api_key=${API_KEY}`).then(response => response.json());
}

function fetchTrendingMovie(page = 1) {
  // let page = 1;
  return fetch(`${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}`).then(response =>
    response.json(),
  );
}

// export default class FilmotekaApiServise {
//   constructor() {
//     this.page = 1;
//     this.keyword = '';
//     this.filmId = '';
//   }
//   fetchTrendingMovie() {
//     return fetch(`${BASE_URL}trending/movie/week?api_key=${API_KEY}`).then(response =>
//       response.json(),
//     );
//   }
//   fetchMovieByKeyword(keyword) {
//     return fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${keyword}&page=${this.page}`)
//       .then(response => response.json())
//       .then(value => {
//         this.page += 1;
//         return value;
//       });
//   }
//   fetchMovieById(filmId) {
//     return fetch(`${BASE_URL}movie/${filmId}?api_key=${API_KEY}`).then(response => response.json());
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get value() {
//     return this.keyword;
//   }
//   set value(newKeyword) {
//     this.keyword = newKeyword;
//   }
//   // get query() {
//   //   return this.filmId;
//   // }
//   // set query(newId) {
//   //   this.filmId = newId;
//   // }
//   //
// }

// (всегда будет отображаться только первая страница запросов,
// что бы она изменялась надо дописать функцию которая бы динамически это меняла,
//   это можно сделать только когда будет какой то слушатель событий)
