import Card from "../components/film-card";
import Popup from "../components/popup";
import {KEY_CODE_ESCAPE, render, unrender} from "../utils";
import UserRatingBlock from "../components/user-rating-block";
import CommentsController from "./comments";
import API from "../api/api";
import {AUTHORIZATION, END_POINT} from "../config";

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView, onDataChangeMain) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._card = new Card(this._data);
    this._popup = new Popup(this._data);
    this._userRatingBlock = new UserRatingBlock(this._data);

    this._popupBottomContainer = this._popup.getElement().querySelector(`.form-details__bottom-container`);

    this._onDataChangeMain = onDataChangeMain;
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

    this._onClickControlsCard();
  }

  init() {
    const cardElement = this._card.getElement();
    const cardPoster = cardElement.querySelector(`.film-card__poster`);
    const cardTitle = cardElement.querySelector(`.film-card__title`);
    const cardComments = cardElement.querySelector(`.film-card__comments`);

    cardPoster.addEventListener(`click`, this._renderPopup.bind(this, MovieController));
    cardTitle.addEventListener(`click`, this._renderPopup.bind(this, MovieController));
    cardComments.addEventListener(`click`, this._renderPopup.bind(this, MovieController));

    render(this._container, cardElement);
  }

  _renderPopup() {
    this._onChangeView();

    const popupElement = this._popup.getElement();
    const footerElement = document.querySelector(`footer`);
    render(footerElement, popupElement, `afterend`);

    if (this._getState().controls.isMarkedAsWatched) {
      this._renderUserRatingBlock();
    }

    const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
    api.getComments(this._data.id)
      .then((comments) => {
        const commentsController = new CommentsController(this._popupBottomContainer, this._data, comments, this._onDataChangeMain);
        commentsController.init();
      });

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KEY_CODE_ESCAPE) {
        unrender(popupElement);
        this._popup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    popupElement.querySelector(`.film-details__controls`)
      .addEventListener(`click`, (evt) => this._onClickControlsInPopup(evt));

    popupElement.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        unrender(popupElement);
        this._popup.removeElement();
      });

    popupElement.querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    popupElement.querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
  }

  _renderUserRatingBlock() {
    unrender(this._userRatingBlock.getElement());
    this._userRatingBlock.removeElement();

    render(this._popup.getElement().querySelector(`.form-details__top-container`), this._userRatingBlock.getElement(), `afterend`);

    const rateInputs = this._userRatingBlock.getElement().querySelectorAll(`.film-details__user-rating-input`);

    rateInputs.forEach((input) => {
      input.addEventListener(`change`, () => {

      });
    });
  }

  _getState(dataFilm) {
    return {
      id: dataFilm.id,
      title: dataFilm.title,
      year: dataFilm.year,
      duration: dataFilm.duration,
      genre: dataFilm.genre,
      posterLink: dataFilm.posterLink,
      description: dataFilm.description,
      controls: {
        isAddedToWatchlist: dataFilm.controls.isAddedToWatchlist,
        isMarkedAsWatched: dataFilm.controls.isMarkedAsWatched,
        isFavorite: dataFilm.controls.isFavorite,
      },
      alternativeTitle: dataFilm.alternativeTitle,
      totalRating: dataFilm.totalRating,
      releaseCountry: dataFilm.releaseCountry,
      director: dataFilm.director,
      ageRating: dataFilm.ageRating,
      actors: dataFilm.actors,
      writers: dataFilm.writers,
      comments: dataFilm.comments,

      personalRating: dataFilm.personalRating,
      watchingDate: dataFilm.watchingDate
    };
  }

  _getControlsValue() {
    return {
      controls: {
        isAddedToWatchlist: this._data.controls.isAddedToWatchlist,
        isMarkedAsWatched: this._data.controls.isMarkedAsWatched,
        isFavorite: this._data.controls.isFavorite
      }
    };
  }

  _onClickControlsCard() {
    const cardElement = this._card.getElement();

    cardElement
      .querySelector(`.film-card__controls`).addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const currentState = this._getControlsValue();

        switch (evt.target.dataset.state) {
          case `watchlist`:
            currentState.controls.isAddedToWatchlist = !currentState.controls.isAddedToWatchlist;
            break;
          case `watched`:
            currentState.controls.isMarkedAsWatched = !currentState.controls.isMarkedAsWatched;
            break;
          case `favorite`:
            currentState.controls.isFavorite = !currentState.controls.isFavorite;
            break;
        }

        const dataForSend = Object.assign(this._data, currentState);
        this._api.updateFilm(this._data.id, dataForSend)
        .then(() => {
          this._data = dataForSend;
          this._onDataChangeMain();
        });
      });
  }

  setDefaultView() {
    if (document.body.contains(this._popup.getElement())) {
      unrender(this._popup.getElement());
      this._popup.removeElement();
    }
  }

  _onClickControlsInPopup(evt) {
    const popupElement = this._popup.getElement();

    evt.preventDefault();
    const entry = this._getState();

    if (evt.target.classList.contains(`film-details__control-label--watchlist`)) {
      popupElement.querySelector(`#watchlist`).checked = !popupElement.querySelector(`#watchlist`).checked;
      entry.controls.isAddedToWatchlist = !entry.controls.isAddedToWatchlist;
    }

    if (evt.target.classList.contains(`film-details__control-label--watched`)) {
      popupElement.querySelector(`#watched`).checked = !popupElement.querySelector(`#watched`).checked;
      entry.controls.isMarkedAsWatched = !entry.controls.isMarkedAsWatched;

      if (popupElement.querySelector(`#watched`).checked) {
        this._renderUserRatingBlock();
      } else {
        unrender(this._userRatingBlock.getElement());
        this._userRatingBlock.removeElement();
      }
    }

    if (evt.target.classList.contains(`film-details__control-label--favorite`)) {
      popupElement.querySelector(`#favorite`).checked = !popupElement.querySelector(`#favorite`).checked;
      entry.controls.isFavorite = !entry.controls.isFavorite;
    }

    this._onDataChange(entry, this._data);
  }
}
