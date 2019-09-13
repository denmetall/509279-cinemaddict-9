import {createElement, KEY_CODE_ENTER, render, unrender} from "../components/utils";
import Comment from "../components/comment";
import CommentsList from "../components/comments-list";
import moment from "moment";

export default class CommentsController {
  constructor(container, dataCard, onDataChange) {
    this._container = container;
    this._dataCard = dataCard;
    this._onDataChange = onDataChange;
    this._commentsList = new CommentsList();
  }

  init() {
    unrender(this._commentsList.getElement());
    this._commentsList.removeElement();

    const formTitle = this._container.querySelector(`.film-details__comments-title`);
    render(formTitle, this._commentsList.getElement(), `afterend`);

    this._dataCard.comments.forEach((commentData) => {
      const comment = new Comment(commentData);
      render(this._commentsList.getElement(), comment.getElement());

      const btnDelete = comment.getElement().querySelector(`.film-details__comment-delete`);

      btnDelete.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const commentId = comment.getElement().dataset.commentId;

        const isChangeCommentsList = true;

        this._onDataChange(null, this._dataCard, isChangeCommentsList, +commentId);
      });
    });

    this._container.querySelectorAll(`.film-details__emoji-label`).forEach((el) => {
      el.addEventListener(`click`, () => {
        const img = el.querySelector(`img`);
        this._container.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
        this._container.querySelector(`.film-details__add-emoji-label`)
          .appendChild(createElement(`<img src="${img.src}" width="55" height="55" alt="emoji">`));
      });
    });

    this._container.querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => this._sendComment(evt));
  }

  _sendComment(evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      const commentTextarea = this._container.querySelector(`.film-details__comment-input`);

      let smileImg = `smile.png`;

      if (this._container.querySelector(`.film-details__add-emoji-label img`)) {
        const smileSrc = this._container.querySelector(`.film-details__add-emoji-label img`).src || `/smile.png`;
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
      this._onDataChange(commentData, this._dataCard, isChangeCommentsList);
    }
  }
}
