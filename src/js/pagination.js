"use strict";

import { fetchMovieByKeyword, fetchMovieById, fetchTrendingMovie } from './api_service.js';
import { noResults } from './notifications.js';
// import ourTeamCards from '../photos.json';

import { maxPAGES, paintedDots, PAGES } from '../index.js';
import { realLaunch } from '../index.js';
export { dotsArrayNext, miniRender }

const doc = document

const dotsArrayNext = () => {

    let dots = [];
    const half = (paintedDots - 1) / 2    
    for (let i = PAGES; i <= PAGES + half; ++i) {
        if (i <= maxPAGES) { dots.push(i) }
    }
    
    if (PAGES < maxPAGES - half - 1) dots.push('.. .', maxPAGES, '->')
           
    for (let i = PAGES-1; i >= PAGES-half; --i) {if (i >= 1) {dots.unshift(i)}}   
    
    if (PAGES > 1 + half + 1) dots.unshift('<-', 1, '. ..')
    

    return dots

}


const miniRender = () => {
  
  const element_ul = doc.getElementById('pag_list_id')  
    element_ul.innerHTML = '';

  dotsArrayNext().map((value) => {
    // console.log(value)

    const element_li = doc.createElement('li')
    const content = doc.createTextNode(`${value}`)
    if (value === '. ...' || value === '... .') element_li.classList = 'pagination_items noActiv'
    else element_li.classList = 'pagination_items'

    if (value === PAGES) element_li.classList += ' center'
    element_li.appendChild(content)
    element_ul.appendChild(element_li)
  })


  return element_ul


}


doc.querySelector(".pagination_list").addEventListener("click", (e, p = PAGES) => {
    const event = e.path[0].textContent
    // console.log('event =', event)
  
      if (event === '->' || event === '.. .') {
         p += 3
       }
       else if (event === '. ..' || event === '<-') {
         p -= 3
      }
    
  else{
      p = Number(event)
      // console.log('NEW_p = ', p)      
  }

  doc.getElementById('mov_gall').innerHTML = '';
    // console.log('p = ', p)
    

    realLaunch(p)
    miniRender(p)
    
        
});










