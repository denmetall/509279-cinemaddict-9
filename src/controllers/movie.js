import Card from "../components/film-card";
import Popup from "../components/popup";
import {KEY_CODE_ESCAPE, render, unrender} from "../components/utils";
import Comment from "../components/comment";
import UserRatingBlock from "../components/user-rating-block";

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._card = new Card(this._data);
    this._popup = new Popup(this._data);
    this._userRatingBlock = new UserRatingBlock(this._data);

    this._onClickControlsCard();
  }

  init() {
    this._card.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._renderPopup.bind(this, MovieController));
    this._card.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._renderPopup.bind(this, MovieController));
    this._card.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._renderPopup.bind(this, MovieController));

    render(this._container, this._card.getElement());
  }

  _renderPopup() {
    this._onChangeView();
    const footerElement = document.querySelector(`footer`);
    render(footerElement, this._popup.getElement(), `afterend`);

    if (this._popup.getElement().querySelector(`#watched`).checked) {
      this._renderUserRatingBlock();
    }

    const commentsContainer = this._popup.getElement().querySelector(`.film-details__comments-list`);
    this._data.comments.forEach((comment) => {
      render(commentsContainer, new Comment(comment).getElement());
    });

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KEY_CODE_ESCAPE) {
        unrender(this._popup.getElement());
        this._popup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    this._popup.getElement()
      .querySelector(`.film-details__controls`).addEventListener(`click`, (evt) => this._onClickControlsInPopup(evt));

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
  }

  _renderUserRatingBlock() {
    unrender(this._userRatingBlock.getElement());
    this._userRatingBlock.removeElement();

    render(this._popup.getElement().querySelector(`.form-details__top-container`), this._userRatingBlock.getElement(), `afterend`);
    this._onClickRatingScoreBlock();
  }

  _getState() {
    return {
      controls: {
        isAddedToWatchlist: this._data.controls.isAddedToWatchlist,
        isMarkedAsWatched: this._data.controls.isMarkedAsWatched,
        isFavorite: this._data.controls.isFavorite
      }
    };
  }

  _onClickControlsCard() {
    this._card.getElement()
      .querySelector(`.film-card__controls`).addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const entry = this._getState();

        if (evt.target.classList.contains(`film-card__controls-item--add-to-watchlist`)) {
          this._card.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).classList.toggle(`film-card__controls-item--active`);
          entry.controls.isAddedToWatchlist = !entry.controls.isAddedToWatchlist;
        }

        if (evt.target.classList.contains(`film-card__controls-item--mark-as-watched`)) {
          this._card.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).classList.toggle(`film-card__controls-item--active`);
          entry.controls.isMarkedAsWatched = !entry.controls.isMarkedAsWatched;
        }

        if (evt.target.classList.contains(`film-card__controls-item--favorite`)) {
          this._card.getElement().querySelector(`.film-card__controls-item--favorite`).classList.toggle(`film-card__controls-item--active`);
          entry.controls.isFavorite = !entry.controls.isFavorite;
        }

        this._onDataChange(entry, this._data);
      });
  }

  setDefaultView() {
    if (document.body.contains(this._popup.getElement())) {
      unrender(this._popup.getElement());
      this._popup.removeElement();
    }
  }

  _onClickControlsInPopup(evt) {
    evt.preventDefault();
    const entry = this._getState();

    if (evt.target.classList.contains(`film-details__control-label--watchlist`)) {
      this._popup.getElement().querySelector(`#watchlist`).checked = !this._popup.getElement().querySelector(`#watchlist`).checked;
      entry.controls.isAddedToWatchlist = !entry.controls.isAddedToWatchlist;
    }

    if (evt.target.classList.contains(`film-details__control-label--watched`)) {
      this._popup.getElement().querySelector(`#watched`).checked = !this._popup.getElement().querySelector(`#watched`).checked;
      entry.controls.isMarkedAsWatched = !entry.controls.isMarkedAsWatched;

      if (this._popup.getElement().querySelector(`#watched`).checked) {
        this._renderUserRatingBlock();
      } else {
        unrender(this._userRatingBlock.getElement());
        this._userRatingBlock.removeElement();
      }
    }

    if (evt.target.classList.contains(`film-details__control-label--favorite`)) {
      this._popup.getElement().querySelector(`#favorite`).checked = !this._popup.getElement().querySelector(`#favorite`).checked;
      entry.controls.isFavorite = !entry.controls.isFavorite;
    }

    this._onDataChange(entry, this._data);
  }

  _onClickRatingScoreBlock() {
    this._userRatingBlock.getElement().querySelector(`.film-details__user-rating-score`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      // Значение рейтинга выводим через evt.target.control.value
    });
  }
}
