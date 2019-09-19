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
import Sort from "../components/sort";
import FilmsTopRated from "../components/films-top-rated";
import MostCommentedFilms from "../components/most-commented-films";
import FilmsAllList from "../components/films-all-list";
import FilmsList from "./films-list";

export default class Page {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this._sort = new Sort();
    this._films = new Films();
    this._filmsAllList = new FilmsAllList();
    this._filmsTopRated = new FilmsTopRated();
    this._mostCommentedFilms = new MostCommentedFilms();
    this._noFilms = new NoFilms();
    this._btnMore = new BtnMore();
    this._sortedFilm = [];
  }

  init() {
    render(this._container, this._sort.getElement());

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    if (this._cards.length) {
      const isStartApp = true;
      render(this._container, this._films.getElement());
      this._renderBoardFilms(isStartApp);
    } else {
      render(this._container, this._noFilms.getElement());
    }
  }

  hidePage() {
    unrender(this._sort.getElement());
    unrender(this._films.getElement());
    this._sort.removeElement();
    this._films.removeElement();
    // this._sort.getElement().classList.add(`visually-hidden`);
    // this._films.getElement().classList.add(`visually-hidden`);
  }

  showPage() {
    this.init();
    // this._sort.getElement().classList.remove(`visually-hidden`);
    // this._films.getElement().classList.remove(`visually-hidden`);
  }

  _renderBoardFilms(isStartApp = false) {
    const cards = this._checkSortedOrStartData();
    const filmAllCardsData = isStartApp ? cards.slice(0, NUMBER_SHOW_FILMS) : cards.slice(0, this._getCountCurrentCards());
    const filmTopCardsData = this._cards.slice().sort((a, b) => b.rating - a.rating).slice(0, NUMBER_SHOW_TOP_RATED_FILMS);
    const filmMostCardsData = this._cards.slice(0, NUMBER_SHOW_MOST_COMMENTED_FILMS);

    unrender(this._filmsAllList.getElement());
    unrender(this._filmsTopRated.getElement());
    unrender(this._mostCommentedFilms.getElement());

    this._filmsAllList.removeElement();
    this._filmsTopRated.removeElement();
    this._mostCommentedFilms.removeElement();

    render(this._films.getElement(), this._filmsAllList.getElement());

    this._renderFilms(filmAllCardsData, this._filmsAllList.getElement().querySelector(`#all-films`));

    if (filmTopCardsData.length) {
      render(this._films.getElement(), this._filmsTopRated.getElement());
      this._renderFilms(filmTopCardsData, this._filmsTopRated.getElement().querySelector(`#top-rated-films`));
    }

    if (filmMostCardsData.length) {
      render(this._films.getElement(), this._mostCommentedFilms.getElement());
      this._renderFilms(filmMostCardsData, this._mostCommentedFilms.getElement().querySelector(`#most-commented-films`));
    }

    if ((this._cards.length - this._getCountCurrentCards()) > 0) {
      this._renderBtnMore();
    }
  }

  _renderFilms(filmsData, container) {
    const filmsListController = new FilmsList(filmsData, container, this._cards, this._renderBoardFilms.bind(this));
    filmsListController.init();
  }

  _renderBtnMore() {
    const filmsListElement = this._films.getElement().querySelector(`#films-list`);
    render(filmsListElement, this._btnMore.getElement());

    this._btnMore.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const countCurrentCards = this._getCountCurrentCards();

      const cards = this._checkSortedOrStartData();
      const filmsForAdded = cards.slice(0, countCurrentCards + NUMBER_SHOW_FILMS);

      this._renderFilms(filmsForAdded, this._filmsAllList.getElement().querySelector(`#all-films`));

      if (filmsForAdded.length - countCurrentCards < NUMBER_SHOW_FILMS) {
        unrender(this._btnMore.getElement());
        this._btnMore.removeElement();
      }
    });
  }

  _getCountCurrentCards() {
    return this._container.querySelector(`#all-films`).querySelectorAll(`.film-card`).length;
  }

  _checkSortedOrStartData() {
    return (this._sortedFilm.length > 0) ? this._sortedFilm : this._cards;
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const allFilmsContainer = this._filmsAllList.getElement().querySelector(`#all-films`);

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
