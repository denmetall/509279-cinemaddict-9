import AbstractComponent from "./abstract-component";
import moment from 'moment';

export default class Comment extends AbstractComponent {
  constructor({id, emotion, comment, author, date}) {
    super();
    this._id = id;
    this._emotion = emotion;
    this._comment = comment;
    this._author = author;
    this._date = date;
  }

  getTemplate() {
    return `
      <li class="film-details__comment" data-comment-id="${this._id}">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${this._emotion}.png" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${this._comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._author}</span>
            <span class="film-details__comment-day">${this._getNameTime(this._date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    `;
  }

  _getNameTime(date) {
    const inMinutes = moment().diff(date, `minutes`);
    switch (true) {
      case inMinutes < 1:
        return `now`;
      case inMinutes <= 3:
        return `a minute ago`;
      case inMinutes <= 59:
        return `a few minutes ago`;
      case inMinutes <= 119:
        return `an hour ago`;
      case inMinutes <= 1439:
        return `a few hours ago`;
      case inMinutes >= 1440:
        return moment(date).fromNow();
    }
    return null;
  }
}
