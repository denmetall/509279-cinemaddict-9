import {
  NUMBER_SHOW_FILMS,
  NUMBER_SHOW_TOP_RATED_FILMS,
  NUMBER_SHOW_MOST_COMMENTED_FILMS,
  render,
  unrender
} from "../components/utils";
import Films from "../components/films";
import NoFilms from "../components/no-flims";
import BtnMore from "../components/btn-more";
import Menu from "../components/menu";
import Sort from "../components/sort";
import MovieController from "./movie";

export default class Page {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this._menu = new Menu();
    this._sort = new Sort();
    this._films = new Films();
    this._noFilms = new NoFilms();
    this._btnMore = new BtnMore();
    this._sortedFilm = [];
  }

  init() {
    const filmAllCardsData = this._cards.slice(0, NUMBER_SHOW_FILMS);
    const filmTopCardsData = this._cards.slice(0, NUMBER_SHOW_TOP_RATED_FILMS);
    const filmMostCardsData = this._cards.slice(0, NUMBER_SHOW_MOST_COMMENTED_FILMS);

    render(this._container, this._menu.getElement());
    render(this._container, this._sort.getElement());

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    if (this._cards.length) {
      render(this._container, this._films.getElement());
    } else {
      render(this._container, this._noFilms.getElement());
    }

    if (this._cards.length) {
      const allFilmsContainer = this._container.querySelector(`#all-films`);
      const topRatedFilmsContainer = this._container.querySelector(`#top-rated-films`);
      const mostCommentedFilmsContainer = this._container.querySelector(`#most-commented-films`);

      filmAllCardsData.forEach((filmCard) => {
        this._renderFilm(filmCard, allFilmsContainer);
      });

      filmTopCardsData.forEach((filmCard) => {
        this._renderFilm(filmCard, topRatedFilmsContainer);
      });

      filmMostCardsData.forEach((filmCard) => {
        this._renderFilm(filmCard, mostCommentedFilmsContainer);
      });

      if (this._cards.length > NUMBER_SHOW_FILMS) {
        const filmsListElement = this._container.querySelector(`#films-list`);
        render(filmsListElement, this._btnMore.getElement());

        this._btnMore.getElement().addEventListener(`click`, (evt) => {
          evt.preventDefault();

          const filmsCount = this._getCountCurrentCards();

          const cards = this._sortedFilm.length > 0 ? this._sortedFilm : this._cards;
          const filmsForAdded = cards.slice(0, filmsCount + NUMBER_SHOW_FILMS);

          allFilmsContainer.innerHTML = ``;

          filmsForAdded.forEach((film) => {
            this._renderFilm(film, allFilmsContainer);
          });

          if (filmsForAdded.length - filmsCount < NUMBER_SHOW_FILMS) {
            unrender(this._btnMore.getElement());
            this._btnMore.removeElement();
          }
        });
      }
    }
  }

  _getCountCurrentCards() {
    return this._container.querySelector(`#all-films`).querySelectorAll(`.film-card`).length;
  }

  _renderFilm(filmCard, container) {
    const movieController = new MovieController(container, filmCard);
    movieController.init();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const countCurrentCards = this._getCountCurrentCards();
    const allFilmsContainer = this._container.querySelector(`#all-films`);
    allFilmsContainer.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `sort-date`:
        this._sortedFilm = this._cards.slice().sort((a, b) => b.year - a.year);
        const sortedByDateUpFilms = this._sortedFilm.slice(0, countCurrentCards);
        sortedByDateUpFilms.forEach((film) => this._renderFilm(film, allFilmsContainer));
        break;
      case `sort-rating`:
        this._sortedFilm = this._cards.slice().sort((a, b) => b.rating - a.rating);
        const sortedByRatingFilms = this._sortedFilm.slice(0, countCurrentCards);
        sortedByRatingFilms.forEach((film) => this._renderFilm(film, allFilmsContainer));
        break;
      case `default`:
        this._sortedFilm = [];
        const sortedByDefaultFilms = this._cards.slice(0, countCurrentCards);
        sortedByDefaultFilms.forEach((film) => this._renderFilm(film, allFilmsContainer));
        break;
    }
  }
}
