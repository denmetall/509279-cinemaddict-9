import AbstractComponent from "./abstract-component";
import moment from "moment";
import 'moment-duration-format';

export default class Card extends AbstractComponent {
  constructor({title, year, duration, genre, posterLink, description, controls, comments, totalRating}) {
    super();
    this._title = title;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._posterLink = posterLink;
    this._description = description;
    this._controls = controls;
    this._comments = comments;
    this._totalRating = totalRating;
  }

  getTemplate() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
          <span class="film-card__duration">${moment.duration(this._duration, `minutes`).format(`h[h] m[m]`)}</span>
          <span class="film-card__genre">${this._genre}</span>
        </p>
        <img src="${this._posterLink}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <a class="film-card__comments">${this._comments.length} comments</a>
        <form class="film-card__controls">
          <button 
            class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${(this._controls.isAddedToWatchlist) ? `film-card__controls-item--active` : ``}"
          >
            Add to watchlist
          </button>
          <button 
            class="film-card__controls-item button film-card__controls-item--mark-as-watched ${(this._controls.isMarkedAsWatched) ? `film-card__controls-item--active` : ``}"
          >
            Mark as watched
          </button>
          <button 
            class="film-card__controls-item button film-card__controls-item--favorite ${(this._controls.isFavorite) ? `film-card__controls-item--active` : ``}"
          >
            Mark as favorite
          </button>
        </form>
      </article>
    `;
  }
}
