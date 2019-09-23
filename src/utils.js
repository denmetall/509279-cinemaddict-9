const KEY_CODE_ESCAPE = 27;
const KEY_CODE_ENTER = 13;
const NUMBER_SHOW_FILMS = 5;
const NUMBER_SHOW_TOP_RATED_FILMS = 2;
const NUMBER_SHOW_MOST_COMMENTED_FILMS = 2;

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template.trim();
  return newElement.firstChild;
};

const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

const getNumberFilmsStat = (control, data) => data.reduce((count, film) => (film.controls[control] ? count + 1 : count), 0);

const getStats = (data) => {
  return {
    get allFilmsNumber() {
      return data.length;
    },
    get watchlistNumber() {
      return getNumberFilmsStat(`isAddedToWatchlist`, data);
    },
    get historyNumber() {
      return getNumberFilmsStat(`isMarkedAsWatched`, data);
    },
    get favoritesNumber() {
      return getNumberFilmsStat(`isFavorite`, data);
    }
  };
};

export {
  createElement,
  render,
  unrender,
  KEY_CODE_ESCAPE,
  KEY_CODE_ENTER,
  NUMBER_SHOW_FILMS,
  NUMBER_SHOW_TOP_RATED_FILMS,
  NUMBER_SHOW_MOST_COMMENTED_FILMS,
  getStats
};
