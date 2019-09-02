import Card from "../components/film-card";
import Popup from "../components/popup";
import {KEY_CODE_ESCAPE, render, unrender} from "../components/utils";
import Comment from "../components/comment";

export default class MovieController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._card = new Card(this._data);
    this._popup = new Popup(this._data);
  }

  init() {
    const footerElement = document.querySelector(`footer`);

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KEY_CODE_ESCAPE) {
        unrender(this._popup.getElement());
        this._popup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onClickCard = () => {
      render(footerElement, this._popup.getElement(), `afterend`);

      const commentsContainer = this._popup.getElement().querySelector(`.film-details__comments-list`);
      this._data.comments.forEach((comment) => {
        render(commentsContainer, new Comment(comment).getElement());
      });

      document.addEventListener(`keydown`, onEscKeyDown);

      this._popup.getElement()
        .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          unrender(this._popup.getElement());
          this._popup.removeElement();
        });

      this._popup.getElement()
        .querySelector(`.film-details__comment-input`)
        .addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

      this._popup.getElement()
        .querySelector(`.film-details__comment-input`)
        .addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });
    };

    this._card.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onClickCard);
    this._card.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onClickCard);
    this._card.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onClickCard);

    render(this._container, this._card.getElement());
  }
}
