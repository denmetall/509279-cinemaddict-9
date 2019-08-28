import {
  NUMBER_SHOW_FILMS,
  NUMBER_SHOW_TOP_RATED_FILMS,
  NUMBER_SHOW_MOST_COMMENTED_FILMS,
  KEY_CODE_ESCAPE,
  render,
  unrender
} from "./utils";
import Films from "./films";
import NoFilms from "./no-flims";
import Card from "./film-card";
import Popup from "./popup";
import Comment from "./comment";
import BtnMore from "./btn-more";
import Menu from "./menu";
import Sort from "./sort";

export default class PageController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
  }

  init() {
    const filmAllCardsData = this._cards.slice(0, NUMBER_SHOW_FILMS);
    const filmTopCardsData = this._cards.slice(0, NUMBER_SHOW_TOP_RATED_FILMS);
    const filmMostCardsData = this._cards.slice(0, NUMBER_SHOW_MOST_COMMENTED_FILMS);

    render(this._container, new Menu().getElement());
    render(this._container, new Sort().getElement());

    if (this._cards.length) {
      render(this._container, new Films().getElement());
    } else {
      render(this._container, new NoFilms().getElement());
    }

    if (this._cards.length) {
      const allFilmsContainer = this._container.querySelector(`#all-films`);
      const topRatedFilmsContainer = this._container.querySelector(`#top-rated-films`);
      const mostCommentedFilmsContainer = this._container.querySelector(`#most-commented-films`);

      filmAllCardsData.forEach((filmCard) => {
        this._renderFilm(filmCard, allFilmsContainer);
      });

      filmTopCardsData.forEach((filmCard) => {
        this._renderFilm(filmCard, topRatedFilmsContainer);
      });

      filmMostCardsData.forEach((filmCard) => {
        this._renderFilm(filmCard, mostCommentedFilmsContainer);
      });

      if (this._cards.length > NUMBER_SHOW_FILMS) {
        const btnMore = new BtnMore();
        const filmsListElement = this._container.querySelector(`#films-list`);
        render(filmsListElement, btnMore.getElement());

        btnMore.getElement().addEventListener(`click`, (evt) => {
          evt.preventDefault();

          const filmsCount = filmsListElement.querySelectorAll(`.film-card`).length;
          const filmsForAdded = this._cards.slice(filmsCount, filmsCount + NUMBER_SHOW_FILMS);

          filmsForAdded.forEach((film) => {
            this._renderFilm(film, allFilmsContainer);
          });

          if (filmsForAdded.length < NUMBER_SHOW_FILMS) {
            unrender(btnMore.getElement());
            btnMore.removeElement();
          }
        });
      }
    }
  }

  _renderFilm(filmCard, container) {
    const footerElement = document.querySelector(`footer`);
    const card = new Card(filmCard);
    const popup = new Popup(filmCard);

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KEY_CODE_ESCAPE) {
        unrender(popup.getElement());
        popup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onClickCard = () => {
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
        .addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

      popup.getElement()
        .querySelector(`.film-details__comment-input`)
        .addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });
    };

    card.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onClickCard);
    card.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onClickCard);
    card.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onClickCard);

    render(container, card.getElement());
  }
}
