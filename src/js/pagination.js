"use strict";

import { maxPAGES, paintedDots, PAGES, KeyAlpha } from '../index.js';
import { realLaunch, threeSearch } from '../index.js';
export { dotsArrayNext, miniRender }
// const doc = refs.doc
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
  // KeyAlpha = key
  // console.log(KeyAlpha)
  const element_ul = doc.getElementById('pag_list_id')
  element_ul.innerHTML = '';

  dotsArrayNext().map((value, index) => {
    // console.log(value)

    const element_li = doc.createElement('li')
    const content = doc.createTextNode(`${value}`)
    // if (value === PAGES && index !== 0)
    if (
      value === '. ..' ||
      value === '.. .' ||
      // value === '<-' ||
      // value === '->' ||
      value === maxPAGES ||
      (value === 1 && index !== 0)
      ) element_li.classList = 'pagination_items noActiv'
    else element_li.classList = 'pagination_items'

    if (value === PAGES) element_li.classList += ' center'
    element_li.appendChild(content)
    element_ul.appendChild(element_li)
  })


  // return element_ul
  return 
}



// console.log(doc.querySelectorAll(".pagination_items"))
doc.getElementById("pag_list_id").addEventListener("click", (e) => { AutoProofreader(e) });




const AutoProofreader = (e, p = PAGES) => {
 
  const event = e.path[0].textContent
  // console.log('event = ', event)
  // console.log('doc.getElementById("pag_list_id") = ', doc.getElementById("pag_list_id").textContent)
  
  if (event !== doc.getElementById("pag_list_id").textContent) {
  
    if (event === '->') {
      ++p
    }
    else if (event === '<-') {
      --p
    }
    else if (event === '.. .') {
      p += 3
    }
    else if (event === '. ..') {
      p -= 3
    }
    
    else {
      p = Number(event)
    }
    doc.getElementById('mov_gall').innerHTML = '';

    if (KeyAlpha !== '') {
      // console.log(KeyAlpha, p)
      threeSearch(KeyAlpha, p)
    }
    else
      realLaunch(p)
  }
  return
        
}










