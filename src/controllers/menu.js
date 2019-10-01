import Menu from "../components/menu";
import {getStats, render, unrender} from "../utils";

export default class MenuController {
  constructor(container, films, statsController, controllerSearch, controllerContent) {
    this._container = container;
    this._films = films;
    this._stats = getStats(this._films);
    this._menu = new Menu(this._stats);
    this._statsController = statsController;
    this._controllerSearch = controllerSearch;
    this._controllerContent = controllerContent;
  }

  init() {
    render(this._container, this._menu.getElement(), `afterbegin`);

    this._menu.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`main-navigation__item`)) {
        return;
      }

      const targetHrefCurrent = evt.target.href;
      const conditionSwitch = targetHrefCurrent.substr(targetHrefCurrent.lastIndexOf(`#`) + 1);

      const removeActiveItem = () => {
        this._menu.getElement().querySelectorAll(`.main-navigation__item`).forEach((item) => {
          item.classList.remove(`main-navigation__item--active`);
        });
      };

      removeActiveItem();
      evt.target.classList.add(`main-navigation__item--active`);

      switch (conditionSwitch) {
        case `all`:
          this._statsController.hideStats();
          this._controllerSearch.hideSearchResult();
          this._controllerContent.showPage(`all`);
          break;
        case `watchlist`:
          this._controllerContent.showPage(`watchlist`);
          this._controllerSearch.hideSearchResult();
          this._statsController.hideStats();
          break;
        case `history`:
          this._controllerContent.showPage(`history`);
          this._controllerSearch.hideSearchResult();
          this._statsController.hideStats();
          break;
        case `favorites`:
          this._controllerContent.showPage(`favorites`);
          this._controllerSearch.hideSearchResult();
          this._statsController.hideStats();
          break;
        case `stats`:
          this._controllerContent.hidePage();
          this._controllerSearch.hideSearchResult();
          this._statsController.init();
          break;
        default:
          break;
      }
    });
  }

  remove() {
    unrender(this._menu.getElement());
    this._menu.removeElement();
  }
}
