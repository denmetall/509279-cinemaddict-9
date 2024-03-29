import {
  NumberShow,
  render,
  unrender,
  Filters
} from "../utils";
import Films from "../components/films";
import NoFilms from "../components/no-flims";
import BtnMore from "../components/btn-more";
import Sort from "../components/sort";
import FilmsTopRated from "../components/films-top-rated";
import MostCommentedFilms from "../components/most-commented-films";
import FilmsAllList from "../components/films-all-list";
import FilmsList from "./films-list";

export default class Page {
  constructor(container, cards, onDataChangeMain) {
    this._container = container;
    this._cards = cards;
    this._sort = new Sort();
    this._films = new Films();
    this._filmsAllList = new FilmsAllList();
    this._filmsTopRated = new FilmsTopRated();
    this._mostCommentedFilms = new MostCommentedFilms();
    this._noFilms = new NoFilms();
    this._btnMore = new BtnMore();
    this._sortFilms = [];
    this._filter = Filters.ALL;
    this._onDataChangeMain = onDataChangeMain;
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
  }

  showPage(filter = Filters.ALL) {
    this._filter = filter;
    this.init();
  }

  _setFilter(cards) {
    switch (this._filter) {
      case Filters.ALL:
        return cards;
      case Filters.WATCHLIST:
        return cards.filter((card) => {
          return card.controls.isAddedToWatchlist;
        });
      case Filters.HISTORY:
        return cards.filter((card) => {
          return card.controls.isMarkedAsWatched;
        });
      case Filters.FAVORITES:
        return cards.filter((card) => {
          return card.controls.isFavorite;
        });
      default:
        return cards;
    }
  }

  _renderBoardFilms(isStartApp = false, dataFilmsFromServer = undefined, popupIsOpen = false) {

    let cards = this._checkSortedOrStartDataAndFilter();

    if (dataFilmsFromServer) {
      cards = dataFilmsFromServer;
      this._cards = dataFilmsFromServer;
    }

    const filmAllCardsData = isStartApp ? cards.slice(0, NumberShow.FILMS) : cards.slice(0, this._getCountCurrentCards());

    const filmRatingSortCardsData = cards.slice().sort((a, b) => b.totalRating - a.totalRating);
    const filmTopCardsData = filmRatingSortCardsData.slice(0, NumberShow.TOP_RATED_FILMS).filter((film) => film.totalRating);

    const filmCountCommentsSortCardsData = cards.slice().sort((a, b) => b.comments.length - a.comments.length);
    const filmMostCardsData = filmCountCommentsSortCardsData.slice(0, NumberShow.MOST_COMMENTED_FILMS).filter((film) => film.comments.length);

    unrender(this._filmsAllList.getElement());
    unrender(this._filmsTopRated.getElement());
    unrender(this._mostCommentedFilms.getElement());

    this._filmsAllList.removeElement();
    this._filmsTopRated.removeElement();
    this._mostCommentedFilms.removeElement();

    render(this._films.getElement(), this._filmsAllList.getElement());

    this._renderFilms(filmAllCardsData, this._filmsAllList.getElement().querySelector(`#all-films`), popupIsOpen);

    if (filmTopCardsData.length) {
      render(this._films.getElement(), this._filmsTopRated.getElement());
      this._renderFilms(filmTopCardsData, this._filmsTopRated.getElement().querySelector(`#top-rated-films`));
    }

    if (filmMostCardsData.length) {
      render(this._films.getElement(), this._mostCommentedFilms.getElement());
      this._renderFilms(filmMostCardsData, this._mostCommentedFilms.getElement().querySelector(`#most-commented-films`));
    }

    if ((cards.length - this._getCountCurrentCards()) > 0) {
      this._renderBtnMore();
    }
  }

  _renderFilms(filmsData, container, popupIsOpen = false) {
    const filmsListController = new FilmsList(filmsData, container, this._cards, this._renderBoardFilms.bind(this), this._onDataChangeMain, popupIsOpen);
    filmsListController.init();
  }

  _renderBtnMore() {
    const filmsListElement = this._films.getElement().querySelector(`#films-list`);
    render(filmsListElement, this._btnMore.getElement());

    this._btnMore.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const countCurrentCards = this._getCountCurrentCards();

      const cards = this._checkSortedOrStartDataAndFilter();
      const filmsForAdded = cards.slice(0, countCurrentCards + NumberShow.FILMS);

      this._renderFilms(filmsForAdded, this._filmsAllList.getElement().querySelector(`#all-films`));

      if (filmsForAdded.length - countCurrentCards < NumberShow.FILMS) {
        unrender(this._btnMore.getElement());
        this._btnMore.removeElement();
      }
    });
  }

  _getCountCurrentCards() {
    return this._container.querySelector(`#all-films`).querySelectorAll(`.film-card`).length;
  }

  _checkSortedOrStartDataAndFilter() {
    const sortedOrNotSortedCards = (this._sortFilms.length > 0) ? this._sortFilms : this._cards;
    return this._setFilter(sortedOrNotSortedCards);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const removeActiveItem = () => {
      this._sort.getElement().querySelectorAll(`.sort__button`).forEach((item) => {
        item.classList.remove(`sort__button--active`);
      });
    };

    removeActiveItem();

    const allFilmsContainer = this._filmsAllList.getElement().querySelector(`#all-films`);

    switch (evt.target.dataset.sortType) {
      case `sort-date`:
        evt.target.classList.add(`sort__button--active`);
        this._sortFilms = this._cards.slice().sort((a, b) => new Date(b.year) - new Date(a.year));
        const sortedByDateUpFilms = this._sortFilms.slice(0, this._getCountCurrentCards());
        this._renderFilms(sortedByDateUpFilms, allFilmsContainer);
        break;
      case `sort-rating`:
        evt.target.classList.add(`sort__button--active`);
        this._sortFilms = this._cards.slice().sort((a, b) => b.totalRating - a.totalRating);
        const sortedByRatingFilms = this._sortFilms.slice(0, this._getCountCurrentCards());
        this._renderFilms(sortedByRatingFilms, allFilmsContainer);
        break;
      case `default`:
        evt.target.classList.add(`sort__button--active`);
        this._sortFilms = [];
        const sortedByDefaultFilms = this._cards.slice(0, this._getCountCurrentCards());
        this._renderFilms(sortedByDefaultFilms, allFilmsContainer);
        break;
    }
  }
}
