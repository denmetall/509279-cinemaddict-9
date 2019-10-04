import AbstractComponent from "./abstract-component";
import moment from "moment";
import {TimeBreakpoint} from "../utils";

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
      case inMinutes < TimeBreakpoint.NOW:
        return `now`;
      case inMinutes <= TimeBreakpoint.MINUTE:
        return `a minute ago`;
      case inMinutes <= TimeBreakpoint.FEW_MINUTES:
        return `a few minutes ago`;
      case inMinutes <= TimeBreakpoint.HOUR:
        return `an hour ago`;
      case inMinutes <= TimeBreakpoint.FEW_HOURS:
        return `a few hours ago`;
      case inMinutes >= TimeBreakpoint.DAY:
        return moment(date).fromNow();
    }
    return null;
  }
}
