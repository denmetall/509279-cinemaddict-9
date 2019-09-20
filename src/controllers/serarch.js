import {render, unrender} from '../components/utils';
import Films from "../components/films";
import SearchInfo from "../components/search-info";
import FilmsList from "./films-list";
import NoFilms from "../components/no-flims";

export default class SearchController {
  constructor(container, cards) {
    this._container = container;
    this._films = new Films();
    this._noFilms = new NoFilms(`Поиск не дал результатов`);
    this._searchInfo = new SearchInfo();
    this._cards = cards;
    this._filmsList = [];
  }

  init(query = null) {
    this.hideSearchResult();

    if (query !== null) {
      this._filmsList = this._cards.filter((film) => {
        return film.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    }

    render(this._container, this._searchInfo.getElement());

    if (this._filmsList.length) {
      render(this._container, this._films.getElement());
      this._renderFilms(this._filmsList, this._films.getElement());
    } else {
      render(this._container, this._noFilms.getElement());
    }
  }

  _renderFilms(filmsList, container) {
    const filmsListController = new FilmsList(filmsList, container, this._cards, this._searchUpdate.bind(this));
    filmsListController.init();
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

  _searchUpdate() {
    this.init();
  }
}
