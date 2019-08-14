import createSearchTemplate from "./components/search";
import createProfileTemplate from "./components/profile";
import createMenuTemplate from "./components/menu";
import createSortTemplate from "./components/sort";
import createFilmsTemplate from "./components/films";
import createCardTemplate from "./components/film-card";
import createBtnMoreTemplate from "./components/btn-more";
import createPopupTemplate from "./components/popup";

const NUMBER_CARDS = [5, 2, 2];

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`#header`);
render(headerElement, createSearchTemplate());
render(headerElement, createProfileTemplate());

const mainElement = document.querySelector(`#main`);
render(mainElement, createMenuTemplate());
render(mainElement, createSortTemplate());
render(mainElement, createFilmsTemplate());

const filmsListElement = mainElement.querySelector(`#films-list`);
render(filmsListElement, createBtnMoreTemplate());

const filmsListContainerElement = mainElement.querySelectorAll(`.films-list__container`);

filmsListContainerElement.forEach((item, index) => {
  for (let i = 0; i < NUMBER_CARDS[index]; i++) {
    render(item, createCardTemplate());
  }
});

const footerElement = document.querySelector(`footer`);
render(footerElement, createPopupTemplate());
