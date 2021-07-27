const libButton = document.querySelector("body > header > div.container > div > nav > ul > li:nth-child(2) > a");
const homeButton = document.querySelector("body > header > div.container > div > nav > ul > li:nth-child(1) > a");
const searchInput = document.querySelector("#search-form");
const btnList = document.querySelector("body > header > div.container > ul");
const watchedButton = document.querySelector("body > header > div.container > ul > li:nth-child(1) > button");
const queueButton = document.querySelector("body > header > div.container > ul > li:nth-child(2) > button");
const headerDom = document.querySelector("body > header");

function onClickLib() {
    searchInput.classList.add("visually-hidden");
    btnList.classList.remove("visually-hidden");
    libButton.classList.add("current");
    homeButton.classList.remove("current");
}
function onClickHome() {
   searchInput.classList.toggle("visually-hidden");
    btnList.classList.toggle("visually-hidden");
    libButton.classList.remove("current");
    homeButton.classList.add("current");
}

function onClickLibBtn() {
    watchedButton.classList.toggle("Active");
    queueButton.classList.toggle("Active");
}
libButton.addEventListener('click', onClickLib)
homeButton.addEventListener('click', onClickHome)
watchedButton.addEventListener('click', onClickLibBtn)
queueButton.addEventListener('click', onClickLibBtn)
