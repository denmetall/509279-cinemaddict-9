import Search from "./components/search";
import Profile from "./components/profile";
import Menu from "./components/menu";
import Sort from "./components/sort";
import Films from "./components/films";
import Card from "./components/film-card";
import BtnMore from "./components/btn-more";
import Footer from "./components/footer";
import Popup from "./components/popup";
import filmCards from "./data/cards";
import {render, unrender} from './components/utils';

const NUMBER_SHOW_FILMS = 5;
const NUMBER_SHOW_TOP_RATED_FILMS = 2;
const NUMBER_SHOW_MOST_COMMENTED_FILMS = 2;

const filmAllCardsData = filmCards.slice(0, NUMBER_SHOW_FILMS);
const filmTopCardsData = filmCards.slice(0, NUMBER_SHOW_TOP_RATED_FILMS);
const filmMostCardsData = filmCards.slice(0, NUMBER_SHOW_MOST_COMMENTED_FILMS);

const headerElement = document.querySelector(`#header`);
render(headerElement, new Search().getElement());
render(headerElement, new Profile().getElement());

const mainElement = document.querySelector(`#main`);
render(mainElement, new Menu().getElement());
render(mainElement, new Sort().getElement());

render(mainElement, new Films().getElement());
render(mainElement, new Footer().getElement(), `afterend`);

const footerElement = document.querySelector(`footer`);

const allFilmsContainer = mainElement.querySelector(`#all-films`);
const topRatedFilmsContainer = mainElement.querySelector(`#top-rated-films`);
const mostCommentedFilmsContainer = mainElement.querySelector(`#most-commented-films`);

const renderFilm = (filmCard, container) => {
  const card = new Card(filmCard);
  const popup = new Popup(filmCard);

  card.getElement()
    .querySelector(`.film-card__poster`)
    .addEventListener(`click`, () => {
      render(footerElement, popup.getElement(), `afterend`);

      popup.getElement()
        .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          unrender(document.querySelector(`.film-details`));
        })
    });

  render(container, card.getElement());
};

filmAllCardsData.forEach((filmCard) => {
  renderFilm(filmCard, allFilmsContainer);
});

filmTopCardsData.forEach((filmCard) => {
  renderFilm(filmCard, topRatedFilmsContainer);
});

filmMostCardsData.forEach((filmCard) => {
  renderFilm(filmCard, mostCommentedFilmsContainer);
});

if (filmCards.length > NUMBER_SHOW_FILMS) {
  const filmsListElement = mainElement.querySelector(`#films-list`);
  render(filmsListElement, new BtnMore().getElement());

  const btnMoreElement = filmsListElement.querySelector(`#load-more`);

  btnMoreElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    console.log(`Кнопка - событие клик`);
  });
}
