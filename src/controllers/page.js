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

    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._menu.getElement());
    render(this._container, this._sort.getElement());

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    if (this._cards.length) {
      render(this._container, this._films.getElement());
      this._renderBoardFilms();
    } else {
      render(this._container, this._noFilms.getElement());
    }
  }

  _renderBoardFilms() {
    const filmAllCardsData = this._cards.slice(0, NUMBER_SHOW_FILMS);
    const filmTopCardsData = this._cards.slice().sort((a, b) => b.rating - a.rating).slice(0, NUMBER_SHOW_TOP_RATED_FILMS);
    const filmMostCardsData = this._cards.slice(0, NUMBER_SHOW_MOST_COMMENTED_FILMS);

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

        const cards = this._sortedFilm.length > 0 ? this._sortedFilm : this._cards;
        const filmsForAdded = cards.slice(0, this._getCountCurrentCards() + NUMBER_SHOW_FILMS);

        this._renderFilms(filmsForAdded, allFilmsContainer);

        if (filmsForAdded.length - this._getCountCurrentCards() < NUMBER_SHOW_FILMS) {
          unrender(this._btnMore.getElement());
          this._btnMore.removeElement();
        }
      });
    }
  }

  _renderFilms(filmsData, container) {
    container.innerHTML = ``;
    filmsData.forEach((film) => this._renderFilm(film, container));
  }

  _renderFilm(filmCard, container) {
    const movieController = new MovieController(container, filmCard, this._onDataChange);
    movieController.init();
  }

  _getCountCurrentCards() {
    return this._container.querySelector(`#all-films`).querySelectorAll(`.film-card`).length;
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData, isPopupOpen = false) {
    if (isPopupOpen) {
      return;
    } else {
      this._renderAfterOnDataChange(newData, oldData);
    }
  }

  _renderAfterOnDataChange(newData, oldData) {
    const countCurrentCards = this._getCountCurrentCards();

    if (this._sortedFilm.length) {
      this._sortedFilm[this._sortedFilm.findIndex((it) => it === oldData)].controls = newData.controls;
      this._cards[this._cards.findIndex((it) => it === oldData)].controls = newData.controls;
      this._renderFilms(this._sortedFilm.slice(0, countCurrentCards), this._container.querySelector(`#all-films`));
    } else {
      this._cards[this._cards.findIndex((it) => it === oldData)].controls = newData.controls;
      this._renderFilms(this._cards.slice(0, countCurrentCards), this._container.querySelector(`#all-films`));
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const allFilmsContainer = this._container.querySelector(`#all-films`);

    switch (evt.target.dataset.sortType) {
      case `sort-date`:
        this._sortedFilm = this._cards.slice().sort((a, b) => b.year - a.year);
        const sortedByDateUpFilms = this._sortedFilm.slice(0, this._getCountCurrentCards());
        this._renderFilms(sortedByDateUpFilms, allFilmsContainer);
        break;
      case `sort-rating`:
        this._sortedFilm = this._cards.slice().sort((a, b) => b.rating - a.rating);
        const sortedByRatingFilms = this._sortedFilm.slice(0, this._getCountCurrentCards());
        this._renderFilms(sortedByRatingFilms, allFilmsContainer);
        break;
      case `default`:
        this._sortedFilm = [];
        const sortedByDefaultFilms = this._cards.slice(0, this._getCountCurrentCards());
        this._renderFilms(sortedByDefaultFilms, allFilmsContainer);
        break;
    }
  }
}
