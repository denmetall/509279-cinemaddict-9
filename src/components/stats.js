import data from '../data/cards.js';
const dataFilms = data;

export const getNumberFilmsStat = (control) => dataFilms.reduce((count, film) => (film.controls[control] ? count + 1 : count), 0);

export default {
  get allFilmsNumber() {
    return dataFilms.length;
  },
  get watchlistNumber() {
    return getNumberFilmsStat(`isAddedToWatchlist`);
  },
  get historyNumber() {
    return getNumberFilmsStat(`isMarkedAsWatched`);
  },
  get favoritesNumber() {
    return getNumberFilmsStat(`isFavorite`);
  }
};
