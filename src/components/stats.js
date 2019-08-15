import data from '../data/cards.js';
const dataFilms = data;

export const getNumberFilmsStat = (control) => {
  return dataFilms.reduce((count, film) => {
    if (film.controls[control]) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
};

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
