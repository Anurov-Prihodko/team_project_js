'use strict';
const refs = {
libButton : document.querySelector("body > header > div.container > div > nav > ul > li:nth-child(2) > a"),
homeButton : document.querySelector("body > header > div.container > div > nav > ul > li:nth-child(1) > a"),
searchInput : document.querySelector("#search-form"),
btnList : document.querySelector("body > header > div.container > ul"),
watchedButton : document.querySelector("body > header > div.container > ul > li:nth-child(1) > button"),
queueButton : document.querySelector("body > header > div.container > ul > li:nth-child(2) > button"),
headerDom : document.querySelector("body > header")
}
export default refs;