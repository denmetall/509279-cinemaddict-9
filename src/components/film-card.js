export default ({title, rating, year, duration, genre, posterLink, description, numberComments, controls}) => {
  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${posterLink}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${numberComments} comments</a>
      <form class="film-card__controls">
        <button 
          class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${(controls.isAddedToWatchlist) ? `film-card__controls-item--active` : ``}"
        >
          Add to watchlist
        </button>
        <button 
          class="film-card__controls-item button film-card__controls-item--mark-as-watched ${(controls.isMarkedAsWatched) ? `film-card__controls-item--active` : ``}"
        >
          Mark as watched
        </button>
        <button 
          class="film-card__controls-item button film-card__controls-item--favorite ${(controls.isFavorite) ? `film-card__controls-item--active` : ``}"
        >
          Mark as favorite
        </button>
      </form>
    </article>
  `;
};
