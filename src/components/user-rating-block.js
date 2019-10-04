import AbstractComponent from "./abstract-component";

export default class UserRatingBlock extends AbstractComponent {
  constructor({posterLink, title, personalRating}) {
    super();
    this._posterLink = posterLink;
    this._title = title;
    this._personalRating = personalRating;
  }

  getTemplate() {
    return `
      <div class="form-details__middle-container">
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <button class="film-details__watched-reset" type="button">Undo</button>
          </div>
  
          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="${this._posterLink}" alt="film-poster" class="film-details__user-rating-img">
            </div>
  
            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${this._title}</h3>
  
              <p class="film-details__user-rating-feelings">How you feel it?</p>
  
              <div class="film-details__user-rating-score">
                ${this._setUserRating(this._personalRating)};
              </div>
            </section>
          </div>
        </section>
      </div>
    `;
  }

  _setUserRating(personalRating) {
    const rate = parseInt(personalRating, 10);
    const templateUserRatingBlock = Array(9).fill(``).map((item, index) => {
      const rating = index + 1;
      return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${rating}" id="rating-${rating}" ${(rating === rate) ? `checked` : ``}><label class="film-details__user-rating-label" for="rating-${rating}">${rating}</label>`;
    })
      .join(` `);

    return templateUserRatingBlock;
  }
}
