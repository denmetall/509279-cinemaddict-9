import AbstractComponent from "./abstract-component";
import moment from "moment";
import "moment-duration-format";
import {Filters} from "../utils";

export default class Popup extends AbstractComponent {
  constructor({title, totalRating, year, duration, genre, posterLink, description, controls, comments, alternativeTitle, releaseCountry, ageRating, actors, writers}) {
    super();
    this._title = title;
    this._totalRating = totalRating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._posterLink = posterLink;
    this._description = description;
    this._controls = controls;
    this._comments = comments;
    this._alternativeTitle = alternativeTitle;
    this._releaseCountry = releaseCountry;
    this._ageRating = ageRating;
    this._actors = actors;
    this._writers = writers;
  }

  getTemplate() {
    return `
      <section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${this._posterLink}" alt="">
      
                <p class="film-details__age">${this._ageRating}+</p>
              </div>
      
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${this._title}</h3>
                    <p class="film-details__title-original">Original: ${this._alternativeTitle}</p>
                  </div>
      
                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${this._totalRating}</p>
                  </div>
                </div>
      
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">Anthony Mann</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${this._writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${this._actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${moment(this._year).format(`DD MMM YYYY`)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${moment.duration(this._duration, `minutes`).format(`h[h] m[m]`)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${this._releaseCountry}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      <span class="film-details__genre">${this._genre}</span>
                      <span class="film-details__genre">Film-Noir</span>
                      <span class="film-details__genre">Mystery</span></td>
                  </tr>
                </table>
      
                <p class="film-details__film-description">
                   ${this._description}
                </p>
              </div>
            </div>
      
            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._controls.isAddedToWatchlist ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist" data-state="${Filters.WATCHLIST}"">Add to watchlist</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._controls.isMarkedAsWatched ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched" data-state="${Filters.HISTORY}">Already watched</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._controls.isFavorite ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite" data-state="${Filters.FAVORITES}">Add to favorites</label>
            </section>
          </div>
      
          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
           
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>
      
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>
      
                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-gpuke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>
    `;
  }
}
