import watchAndQueueTpl from './watched_and_queue_tpl';
import refs from './refs';
import {fetchMovieById} from './api_service';
import { realLaunch } from '../index.js';

refs.buttons.addEventListener('click', onMyLibBtnsClick);
refs.myLibBtn.addEventListener('click', onMyLibClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);

document.querySelector('.logo').addEventListener('click', initial)

function initial() {
  localStorage.setItem('home page main', '')
  // console.log('ok')
}

//mark//
refs.watched.addEventListener('click', watched);
refs.queue.addEventListener('click', queue);

function queue() {   
  localStorage.setItem('position', 'queue')
  // console.log('queue!!!!')
}
function watched() {
  localStorage.setItem('position', 'watched') 
  // console.log('watched!!!!')
}
//mark//

function onHomeBtnClick() {
  document.getElementById('home').lastChild.textContent = 'HOME'
  localStorage.setItem('position', '')
  
  refs.cardContainer.innerHTML = '';

  hideMyLibNotification();
  setTimeout(() => setHomeHeight(), 200);
  correctionStyles();
  // realLaunch(1); !!!!!
  realLaunch(Number(localStorage.getItem('home page main')))
}


// console.log(document.getElementsByClassName('.modal-movie-card-container'))

function onMyLibClick() {
  //mark//
  localStorage.setItem('position', 'watched')
  refs.watchedButton.classList.add('active');  
  refs.queueButton.classList.remove('active');

  document.getElementById('home').lastChild.textContent = 'BACK'

  
  // console.log(document.getElementsByClassName('.site-nav-link'))
  // console.log(refs.homeBtn.textContent = 'BACK')
  //mark// 

  refs.cardContainer.innerHTML = '';
  setTimeout(() => refs.pagination.classList.add('visually-hidden'), 200);
  refs.addError.classList.add('visually-hidden');

  let ids = getItemsFromStorage('watched');

  setTimeout(() => setMyLibHeight(), 200);

  if (!ids) {
    showMyLibNotification();
    return;
  }
  hideMyLibNotification();
  fetchMoviesOnMyLibBtnsClick(ids);
}

function onMyLibBtnsClick(event) {
  // localStorage.setItem('position', 'watched')
  
  
  let ids = getItemsFromStorage(event.target.textContent)
  console.log('ids = ', ids)

  if (!ids) {
    showMyLibNotification();    
    return;
  }
  else  

  hideMyLibNotification();
  fetchMoviesOnMyLibBtnsClick(ids);
}

function fetchMoviesOnMyLibBtnsClick(idsForFetch) {
    refs.cardContainer.innerHTML = '';

  const allPromises = idsForFetch.map(id => fetchMovieById(id));

  Promise.all(allPromises)
    .then(response => response.map(result => renderCardsFromStorage(result)));
}


  
function getItemsFromStorage(key) {
  const idFromStorage = localStorage.getItem(key);
  if (!idFromStorage) return
  return idFromStorage.split(',');
}

function renderCardsFromStorage(info) {
  return refs.cardContainer.insertAdjacentHTML('beforeend', watchAndQueueTpl(info));
}

function correctionStyles() {
  refs.searchInput.classList.toggle('visually-hidden');
  refs.btnList.classList.toggle('visually-hidden');
  refs.libButton.classList.remove('current');
  refs.homeButton.classList.add('current');
  refs.headerDom.classList.remove('lib-header');
  refs.watchedButton.classList.add('active');  
  refs.queueButton.classList.remove('active');
  setTimeout(() => refs.pagination.classList.remove('visually-hidden'), 200);
}

function setMyLibHeight() {
  refs.gallery.classList.remove('calc-height-1');
  refs.gallery.classList.add('calc-height-2');
}

function setHomeHeight() {
  refs.gallery.classList.add('calc-height-1');
  refs.gallery.classList.remove('calc-height-2');
}

function showMyLibNotification() {
  refs.cardContainer.innerHTML = '';
  refs.notification.classList.remove('visually-hidden');
}

function hideMyLibNotification() {
  refs.notification.classList.add('visually-hidden');

}