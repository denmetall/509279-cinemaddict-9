import {createElement} from "./utils";

export default class Card {
  constructor({title, rating, year, duration, genre, posterLink, description, numberComments, controls}) {
    this._element = null;
    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._posterLink = posterLink;
    this._description = description;
    this._numberComments = numberComments;
    this._controls = controls;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._duration}</span>
          <span class="film-card__genre">${this._genre}</span>
        </p>
        <img src="./images/posters/${this._posterLink}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <a class="film-card__comments">${this._numberComments} comments</a>
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
