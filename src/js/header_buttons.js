// const libButton = document.querySelector("body > header > div.container > div > nav > ul > li:nth-child(2) > a");
// const homeButton = document.querySelector("body > header > div.container > div > nav > ul > li:nth-child(1) > a");
// const searchInput = document.querySelector("#search-form");
// const btnList = document.querySelector("body > header > div.container > ul");
// const watchedButton = document.querySelector("body > header > div.container > ul > li:nth-child(1) > button");
// const queueButton = document.querySelector("body > header > div.container > ul > li:nth-child(2) > button");
// const headerDom = document.querySelector("body > header");
import refs from './refs';
function onClickLib() {
    refs.searchInput.classList.add("visually-hidden");
    refs.btnList.classList.remove("visually-hidden");
    refs.libButton.classList.add("current");
    refs.homeButton.classList.remove("current");
    refs.headerDom.classList.add('lib-header');
}
function onClickHome() {
   refs.searchInput.classList.toggle("visually-hidden");
    refs.btnList.classList.toggle("visually-hidden");
    refs.libButton.classList.remove("current");
    refs.homeButton.classList.add("current");
     refs.headerDom.classList.remove('lib-header');

}

function onClickLibBtnWatched() {
    refs.watchedButton.classList.add("active");
    refs.queueButton.classList.remove("active");
}
function onClickLibBtnQueue() {
    refs.watchedButton.classList.remove("active");
    refs.queueButton.classList.add("active");
}
refs.libButton.addEventListener('click', onClickLib)
refs.homeButton.addEventListener('click', onClickHome)
refs.watchedButton.addEventListener('click', onClickLibBtnWatched)
refs.queueButton.addEventListener('click', onClickLibBtnQueue)
console.log(refs);
