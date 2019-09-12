import Card from "../components/film-card";
import Popup from "../components/popup";
import {KEY_CODE_ESCAPE, KEY_CODE_ENTER, render, unrender, createElement} from "../components/utils";
import Comment from "../components/comment";
import UserRatingBlock from "../components/user-rating-block";
import moment from "moment";
import CommentsList from "../components/comments-list";

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._card = new Card(this._data);
    this._popup = new Popup(this._data);
    this._userRatingBlock = new UserRatingBlock(this._data);
    this._commentsList = new CommentsList();

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

    if (document.querySelector(`.film-details`)) {
      this._renderPopup();
    }
  }

  _renderPopup() {
    this._onChangeView();

    const popupElement = this._popup.getElement();
    const footerElement = document.querySelector(`footer`);
    render(footerElement, popupElement, `afterend`);

    if (this._getState().controls.isMarkedAsWatched) {
      this._renderUserRatingBlock();
    }

    this._renderComments(this._data.comments);

    popupElement.querySelectorAll(`.film-details__emoji-label`).forEach((el) => {
      el.addEventListener(`click`, () => {
        const img = el.querySelector(`img`);
        popupElement.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
        popupElement.querySelector(`.film-details__add-emoji-label`)
          .appendChild(createElement(`<img src="${img.src}" width="55" height="55" alt="emoji">`));
      });
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

    popupElement.querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => this._sendComment(evt));

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

  _renderComments(commentsData) {
    unrender(this._commentsList.getElement());
    this._commentsList.removeElement();

    const formTitle = this._popup.getElement().querySelector(`.film-details__comments-title`);
    render(formTitle, this._commentsList.getElement(), `afterend`);

    commentsData.forEach((commentData) => {
      const comment = new Comment(commentData);
      render(this._commentsList.getElement(), comment.getElement());

      const btnDelete = comment.getElement().querySelector(`.film-details__comment-delete`);

      btnDelete.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const commentId = comment.getElement().dataset.commentId;

        const isChangeCommentsList = true;

        this._onDataChange(null, this._data, isChangeCommentsList, commentId);
      });
    });
  }

  _renderUserRatingBlock() {
    unrender(this._userRatingBlock.getElement());
    this._userRatingBlock.removeElement();

    render(this._popup.getElement().querySelector(`.form-details__top-container`), this._userRatingBlock.getElement(), `afterend`);

    this._userRatingBlock.getElement().querySelector(`.film-details__user-rating-score`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
    });
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
    const cardElement = this._card.getElement();

    cardElement
      .querySelector(`.film-card__controls`).addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const entry = this._getState();

        if (evt.target.classList.contains(`film-card__controls-item--add-to-watchlist`)) {
          cardElement.querySelector(`.film-card__controls-item--add-to-watchlist`).classList.toggle(`film-card__controls-item--active`);
          entry.controls.isAddedToWatchlist = !entry.controls.isAddedToWatchlist;
        }

        if (evt.target.classList.contains(`film-card__controls-item--mark-as-watched`)) {
          cardElement.querySelector(`.film-card__controls-item--mark-as-watched`).classList.toggle(`film-card__controls-item--active`);
          entry.controls.isMarkedAsWatched = !entry.controls.isMarkedAsWatched;
        }

        if (evt.target.classList.contains(`film-card__controls-item--favorite`)) {
          cardElement.querySelector(`.film-card__controls-item--favorite`).classList.toggle(`film-card__controls-item--active`);
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

  _sendComment(evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      const popupElement = this._popup.getElement();

      const commentTextarea = popupElement.querySelector(`.film-details__comment-input`);

      let smileImg = `smile.png`;

      if (popupElement.querySelector(`.film-details__add-emoji-label img`)) {
        const smileSrc = popupElement.querySelector(`.film-details__add-emoji-label img`).src || `/smile.png`;
        smileImg = smileSrc.substr(smileSrc.lastIndexOf(`/`) + 1);
      }

      const commentData = {
        id: Math.random(),
        author: `Evstratchik denis`,
        text: commentTextarea.value,
        date: moment(Date.now()).format(`YY/MM/DD HH:MM`),
        smile: smileImg,
      };

      commentTextarea.value = ``;
      const isChangeCommentsList = true;
      this._onDataChange(commentData, this._data, isChangeCommentsList);
    }
  }
}
