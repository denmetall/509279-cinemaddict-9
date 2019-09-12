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
import MovieController from "./movie";
import FilmsTopRated from "../components/films-top-rated";
import MostCommentedFilms from "../components/most-commented-films";
import FilmsAllList from "../components/films-all-list";

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

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
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
    this._sort.getElement().classList.add(`visually-hidden`);
    this._films.getElement().classList.add(`visually-hidden`);
  }

  showPage() {
    this._sort.getElement().classList.remove(`visually-hidden`);
    this._films.getElement().classList.remove(`visually-hidden`);
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
    container.innerHTML = ``;
    filmsData.forEach((film) => this._renderFilm(film, container));
  }

  _renderFilm(filmCard, container) {
    const movieController = new MovieController(container, filmCard, this._onDataChange, this._onChangeView);
    movieController.init();
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
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

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData, isChangeCommentsList = false) {
    if (isChangeCommentsList) {
      if (newData === null) {
        debugger;
        console.log(`Как мне найти комментарий, который нужно удалить?`);
      } else {
        this._cards[this._cards.findIndex((it) => it === oldData)].comments.push(newData);
      }
      this._renderBoardFilms();

    } else {
      if (this._sortedFilm.length) {
        this._sortedFilm[this._sortedFilm.findIndex((it) => it === oldData)].controls = newData.controls;
        this._cards[this._cards.findIndex((it) => it === oldData)].controls = newData.controls;
        this._renderBoardFilms();
      } else {
        this._cards[this._cards.findIndex((it) => it === oldData)].controls = newData.controls;
        this._renderBoardFilms();
      }
    }
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
