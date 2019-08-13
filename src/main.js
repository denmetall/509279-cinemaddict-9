import {getSearchTemplate} from "./components/search";
import {getProfileTemplate} from "./components/profile";
import {getMenuTemplate} from "./components/menu";
import {getSortTemplate} from "./components/sort";
import {getFilmsTemplate} from "./components/films";
import {getCardTemplate} from "./components/film-card";
import {getBtnMoreTemplate} from "./components/btn-more";
import {getPopupTemplate} from "./components/popup";

const NUMBER_CARDS = [5, 2, 2];

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`header`);
render(headerElement, getSearchTemplate());
render(headerElement, getProfileTemplate());

const mainElement = document.querySelector(`main`);
render(mainElement, getMenuTemplate());
render(mainElement, getSortTemplate());
render(mainElement, getFilmsTemplate());

const filmsListElement = mainElement.querySelector(`.films-list`);
render(filmsListElement, getBtnMoreTemplate());

const filmsListContainerElement = mainElement.querySelectorAll(`.films-list__container`);

filmsListContainerElement.forEach((item, index) => {
  for (let i = 0; i < NUMBER_CARDS[index]; i++) {
    render(item, getCardTemplate());
  }
});

const footerElement = document.querySelector(`footer`);
render(footerElement, getPopupTemplate());
