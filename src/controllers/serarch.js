import {render, unrender} from '../utils';
import Films from "../components/films";
import SearchInfo from "../components/search-info";
import FilmsList from "./films-list";
import NoFilms from "../components/no-flims";

export default class SearchController {
  constructor(container, cards, onDataChangeMain) {
    this._container = container;
    this._films = new Films();
    this._noFilms = new NoFilms(`Поиск не дал результатов`);
    this._cards = cards;
    this._filmsList = [];
    this._onDataChangeMain = onDataChangeMain;
    this._searchInfo = new SearchInfo();
  }

  init(query = null) {
    this.hideSearchResult();

    if (query !== null) {
      this._filmsList = this._cards.filter((film) => {
        return film.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    }

    render(this._container, this._searchInfo.getElement());
    this._searchInfo.getElement().querySelector(`.result__count`).textContent = this._filmsList.length;

    if (this._filmsList.length) {
      render(this._container, this._films.getElement());
      this._renderFilms(this._filmsList, this._films.getElement());
    } else {
      render(this._container, this._noFilms.getElement());
    }
  }

  hideSearchResult() {
    unrender(this._searchInfo.getElement());
    this._searchInfo.removeElement();
    unrender(this._films.getElement());
    this._films.removeElement();
    unrender(this._noFilms.getElement());
    this._noFilms.removeElement();
  }

  showSearch() {
    this.init();
  }

  _renderFilms(filmsList, container) {
    const filmsListController = new FilmsList(filmsList, container, this._cards, this._searchUpdate.bind(this), this._onDataChangeMain);
    filmsListController.init();
  }

  _searchUpdate() {
    this.init();
  }
}
