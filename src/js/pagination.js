"use strict";

import { maxPAGES, paintedDots, PAGES } from '../index.js';
export { dotsArrayNext }

const dotsArrayNext = () => {
    let dots = [];
    
    

    const half = (paintedDots - 1) / 2
    
    for (let i = PAGES; i <= PAGES + half; ++i) {

        if (i <= maxPAGES) { dots.push(i) }
    }
    
    if (PAGES < maxPAGES - half - 1) {
        dots.push('.. .')
        dots.push(maxPAGES)
        dots.push('->')
    }
           
    for (let i = PAGES-1; i >= PAGES-half; --i) {if (i >= 1) {dots.unshift(i)}}   
    
    if (PAGES > 1 + half + 1) {
        dots.unshift('. ..')
        dots.unshift(1)
        dots.unshift('<-')
    }

    return dots

}




 









