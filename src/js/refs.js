'use strict';
const refs = {
  libButton: document.querySelector(
    'body > header > div.container > div > nav > ul > li:nth-child(2) > a',
  ),
  homeButton: document.querySelector(
    'body > header > div.container > div > nav > ul > li:nth-child(1) > a',
  ),
  searchInput: document.querySelector('#search-form'),
  input: document.querySelector('.search-input'),
  btnList: document.querySelector('body > header > div.container > ul'),
  watchedButton: document.querySelector(
    'body > header > div.container > ul > li:nth-child(1) > button',
  ),
  queueButton: document.querySelector(
    'body > header > div.container > ul > li:nth-child(2) > button',
  ),
  headerDom: document.querySelector("body > header > div.bg-container"),
  //   footer: document.querySelector('footer'),
  linkToOurTeam: document.querySelector('.about-us-link'),
  backdrop: document.querySelector('.backdrop-our-team'),
  ourTeamList: document.querySelector('.our-team-list'),
  cardContainer: document.querySelector('.movie-gallery-list'),

  addError: document.querySelector('[data-action="add-error"]'),
  //movie-card-modal
  movieCardBackdrop: document.querySelector('.backdrop-movie-card'),
  modalMovieCardContainer: document.querySelector('.modal-movie-card-container'),
  // Надоедалка
  modal: document.querySelector('#subscription-modal'),
  subscribeBtn: document.querySelector('button[data-subscribe]'),
  toggleSwitch: document.querySelector('.theme-switch__toggle'),
  scrollToTopBtn: document.getElementById('scrollToTopBtn'),
  //Modal for one card
 modalCardForOneFilm: document.getElementById('123'),
  
};
export default refs;
