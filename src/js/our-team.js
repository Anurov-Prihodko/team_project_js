'use strict';

import ourTeamCards from '../photos.json';
import ourTeamTemplate from '../templates/our_team_cards';


const refs = {
    footer: document.querySelector('footer'),
    linkToOurTeam: document.querySelector('.about-us-link'),
    backdrop: document.querySelector('.backdrop-our-team'),
    ourTeamList: document.querySelector('.our-team-list'),
}
    
refs.linkToOurTeam.addEventListener('click', onOurTeamLinkClick);

    
function renderOurTeamCards(info) {
    const cards = ourTeamTemplate(info);
    refs.ourTeamList.insertAdjacentHTML('beforeend', cards)
    }


function clearTeamMemberCards() {
    refs.ourTeamList.innerHTML = '';
}

/* Снимаем visually-hidden с модалки при клике на GoIT Students */
function onOurTeamLinkClick(event) {
    event.preventDefault();
    addEventListenerOnEscKey();
    addEventListenerOnBackdrop();

    renderOurTeamCards(ourTeamCards);
    refs.backdrop.classList.remove('visually-hidden');
    }

/* Закрываем модалку при клике на бэкдроп или кнопку закрытия */
function onbackdropClick(event) {
    const closeTags = ['DIV', 'svg', 'use']
        
    if(!closeTags.includes(event.target.nodeName)) {
        return;
    }
    
    removeEventListenerFromBackdrop();
    removeEventListenerFromEscKey();
    refs.backdrop.classList.add('visually-hidden');
    clearTeamMemberCards();
    }
    
/* Закрываем модалку при нажатии клавиши Esc на клавиатуре */
function onEscClick(event) {
    if (event.keyCode !== 27) {
        return;
    }
    
    removeEventListenerFromBackdrop();
    removeEventListenerFromEscKey();
    refs.backdrop.classList.add('visually-hidden');
    clearTeamMemberCards();
    }


/* Функции повесить/снять слушатели событий при открытии/закрытии модалки */

function addEventListenerOnBackdrop() {
    refs.backdrop.addEventListener('click', onbackdropClick);
    }
    
function removeEventListenerFromBackdrop() {
    refs.backdrop.removeEventListener('click', onbackdropClick);
    }

function addEventListenerOnEscKey() {
    window.addEventListener('keydown', onEscClick);
}

function removeEventListenerFromEscKey() {
    window.removeEventListener('keydown', onEscClick);
}
