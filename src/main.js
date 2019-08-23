import Search from "./components/search";
import Profile from "./components/profile";
import Menu from "./components/menu";
import Sort from "./components/sort";
import Films from "./components/films";
import Card from "./components/film-card";
import BtnMore from "./components/btn-more";
import Footer from "./components/footer";
import Popup from "./components/popup";
import Comment from "./components/comment";
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

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      unrender(popup.getElement());
      popup.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };



  card.getElement()
    .querySelector(`.film-card__poster`)
    .addEventListener(`click`, () => {
      render(footerElement, popup.getElement(), `afterend`);

      const commentsContainer = popup.getElement().querySelector(`.film-details__comments-list`);
      filmCard.comments.forEach((comment) => {
        render(commentsContainer, new Comment(comment).getElement());
      });

      document.addEventListener(`keydown`, onEscKeyDown);

      popup.getElement()
        .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          unrender(popup.getElement());
          popup.removeElement();
        });

      popup.getElement()
        .querySelector(`.film-details__comment-input`)
        .addEventListener(`focus`, (evt) => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

      popup.getElement()
        .querySelector(`.film-details__comment-input`)
        .addEventListener(`blur`, (evt) => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });
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
  const btnMore = new BtnMore();
  const filmsListElement = mainElement.querySelector(`#films-list`);
  render(filmsListElement, btnMore.getElement());

  btnMore.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    let filmsCount = filmsListElement.querySelectorAll(`.film-card`).length;
    let filmsForAdded = filmCards.slice(filmsCount, filmsCount + NUMBER_SHOW_FILMS);

    filmsForAdded.forEach((film) => {
      renderFilm(film, allFilmsContainer);
    });

    if (filmsForAdded.length < 5) {
      unrender(btnMore.getElement());
    }
  });
}
