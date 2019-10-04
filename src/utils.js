const KEY_CODE_ESCAPE = 27;
const KEY_CODE_ENTER = 13;
const NUMBER_SHOW_FILMS = 5;
const NUMBER_SHOW_TOP_RATED_FILMS = 2;
const NUMBER_SHOW_MOST_COMMENTED_FILMS = 2;
const MAX_DESCRIPTION_LENGTH = 139;

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const Status = {
  OK: 200,
  REDIRECTION: 300
};

const RatingDefault = {
  TOTAL: 0,
  AGE: 0,
  PERSONAL: 0
};

const TimeBreakpoint = {
  NOW: 1,
  MINUTE: 3,
  FEW_MINUTES: 59,
  HOUR: 119,
  FEW_HOURS: 1439,
  DAY: 1440
};

const Nickname = {
  NOVICE: 10,
  FAN: 20,
  MOVIE_BUFF: 21
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

const getStats = (films) => {
  return {
    get allFilmsNumber() {
      return films.length;
    },
    get watchlistNumber() {
      return getNumberFilmsStat(`isAddedToWatchlist`, films);
    },
    get historyNumber() {
      return getNumberFilmsStat(`isMarkedAsWatched`, films);
    },
    get favoritesNumber() {
      return getNumberFilmsStat(`isFavorite`, films);
    }
  };
};

const getNameUser = (historyNumber) => {
  let userName = 0;

  if (historyNumber > 0 && historyNumber < Nickname.NOVICE) {
    userName = `Novice`;
  } else if (historyNumber > Nickname.NOVICE && historyNumber <= Nickname.FAN) {
    userName = `Fan`;
  } else {
    userName = `Movie Buff`;
  }

  return userName;
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
  MAX_DESCRIPTION_LENGTH,
  getStats,
  getNameUser,
  Status,
  RatingDefault,
  TimeBreakpoint
};
