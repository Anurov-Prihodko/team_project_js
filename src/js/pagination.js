"use strict";

// import '/sass/main.scss';
import { fetchMovieByKeyword, fetchMovieById, fetchTrendingMovie } from '/js/api_service';
import { noResults } from '/js/notifications';

const fetchEnd = fetchTrendingMovie()

const API_KEY = 'api_key=5d05ad92e2950afb0bac282a2145359d'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`
// const maxPAGES = 100 // треба витягнути максимальну кількість сторінок (PAGES)
let maxPAGES = 1
let paintedDots = 5 //тут можна змінити кількість відображених цифр (має бути /2 із решьою)

export let PAGES = 1 // початкова сторінка
let dots = [];



// maxPAGES = fetchEnd   
//     .then(r => { return r.total_pages })







(async function(){ ///автоматичне заповнення максимумрм

    maxPAGES = await fetchTrendingMovie().then(r => { return r.total_pages })
    // console.log("maxPAGES = ", maxPAGES)

})()
 







const dotsArrayNext = () => {
    dots = []

    

    const half = (paintedDots - 1) / 2

    // dots.push('<-')
    
    for (let i = PAGES; i <= PAGES + half; ++i) {

        if (i <= maxPAGES) { dots.push(i) }
    }
    
    if (PAGES < maxPAGES - half - 1) {
        dots.push('...')
        dots.push(maxPAGES)
        dots.push('->')
    }
    // if (PAGES < maxPAGES - half) {dots.push(maxPAGES) }
    
           
    for (let i = PAGES-1; i >= PAGES-half; --i) {if (i >= 1) {dots.unshift(i)}}   
    
    if (PAGES > 1 + half + 1) {
        dots.unshift('...')
        dots.unshift(1)
        dots.unshift('<-')
    }
    //  else { }
    // if (PAGES > 1 + half ) {dots.unshift(1) } else {}
  
 

    return dots

}
// dotsArrayNext()


    
        // console.info('-----------default--------')
        // console.info("PAGES = ", PAGES)        
        // console.info('dots = ', dots)        
        // console.info('-----------default--------')  






//(+)
const following = (next) => {
    
    if (PAGES === maxPAGES - 1) {
        //тут робимо стрілочку в право не активною  
        
    }
    ++PAGES
    dotsArrayNext()
    return PAGES
}

//(-)
const previous = () => {
    if (PAGES > 1) {        
        --PAGES
        dotsArrayNext()
    }
    else { 
        PAGES = 1
    }
    return 
}



//(next)
const position = (next) => {

    

         if (next >= maxPAGES) PAGES = maxPAGES        
    else if (next <= 1)        PAGES = 1

   
    dotsArrayNext()   
    
    
}
 
 const  paginationMuvies =  (url, action, next = 0) => {    

    switch(action) {
        case 'following':
            following()
    break

        case 'previous':
            previous()
            
    break
        
        case 'position':
            position(next)           
            
    break
    }  
    
    newFetch(`${url}&page=${PAGES}`)

    
}

const newFetch = (url) => {

    fetch(url)
        .then(res => res.json())
        .then(r => {
           
            console.info('')
            console.info("PAGES = ", PAGES)
            console.info('dots = ', dots)
            console.info('fetch = ')
            //  console.log( r.results.length)
            //  console.log( "r.total_pages = ", r.total_pages)
            console.log(r)
        })
        .then(dotsArrayNext())
        .then(miniRender())
}


const pagination =[...document.querySelector(".pagination_list").children]




const miniRender = () => {


 


    pagination.map((T, i) => {

        if (dots[i] === PAGES) {
            // console.info('PAGES = ', PAGES)
            // console.info('T.textContent = ', T.textContent)
            T.textContent = dots[i]
            T.className = "pagination_items center"
        } else if (dots[i] === '...') {            
            T.textContent = dots[i]
            T.className = "pagination_items noActiv"
        }else{
            T.textContent = dots[i]
            T.className = "pagination_items"
        }
        
})
}


document.querySelector(".pagination_list").addEventListener("click", e => {
    const event = e.path[0].textContent
    console.log(event)
    if (event === '->') paginationMuvies(API_URL, 'following')
    else if (event === '<-') paginationMuvies(API_URL, 'previous')
    else {
        PAGES = Number(event)
        paginationMuvies(API_URL, 'position', event)
    }
});


// (box)
setTimeout( function(){ 
    paginationMuvies(API_URL, 'position', 1)
 
    

// paginationMuvies(API_URL, 'position', 450)
// paginationMuvies(API_URL, 'position', 5)
// paginationMuvies(API_URL, 'position', 2)
// paginationMuvies(API_URL, 'position', 10)
// paginationMuvies(API_URL, 'position', -2)
// paginationMuvies(API_URL, 'position', 0)
// paginationMuvies(API_URL, 'position', 1010)

// (+)
// paginationMuvies(API_URL, 'following')
// paginationMuvies(API_URL, 'following')
// paginationMuvies(API_URL, 'following')
// paginationMuvies(API_URL, 'following')
// paginationMuvies(API_URL, 'following')
// paginationMuvies(API_URL, 'following')
// paginationMuvies(API_URL, 'following')

// (-)
// paginationMuvies(API_URL, 'previous')
// paginationMuvies(API_URL, 'previous')
// paginationMuvies(API_URL, 'previous')
// paginationMuvies(API_URL, 'previous')
// paginationMuvies(API_URL, 'previous')
// paginationMuvies(API_URL, 'previous')
}, 500);
