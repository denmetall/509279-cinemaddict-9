import AbstractComponent from "./abstract-component";

export default class Comment extends AbstractComponent {
  constructor({smile, text, author, date}) {
    super();
    this._smile = smile;
    this._text = text;
    this._author = author;
    this._date = date;
  }

  getTemplate() {
    return `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${this._smile}" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${this._text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._author}</span>
            <span class="film-details__comment-day">${this._date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    `;
  }
}
