import Card from "../components/film-card";
import Popup from "../components/popup";
import {KEY_CODE_ESCAPE, render, unrender} from "../components/utils";
import Comment from "../components/comment";

export default class MovieController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
  }

  init() {
    const footerElement = document.querySelector(`footer`);
    const card = new Card(this._data);
    const popup = new Popup(this._data);

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
      this._data.comments.forEach((comment) => {
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

    render(this._container, card.getElement());
  }
}
