import Search from "./components/search";
import Profile from "./components/profile";
import Menu from "./components/menu";
import Footer from "./components/footer";
import {render, getStats, unrender} from './utils';
import Page from "./controllers/page";
import SearchController from "./controllers/serarch";
import StatsController from "./controllers/stats";
import API from "./api/api";
import NoFilms from "./components/no-flims";
import {END_POINT, AUTHORIZATION} from "./config";

const headerElement = document.querySelector(`#header`);
const search = new Search();
render(headerElement, search.getElement());

const mainElement = document.querySelector(`#main`);
const loading = new NoFilms(`Loading`);
render(mainElement, loading.getElement());

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

let controllerContent = null;

const startApp = (films) => {
  unrender(loading.getElement());
  loading.removeElement();

  const stats = getStats(films);

  render(headerElement, new Profile(stats.historyNumber).getElement());

  const menu = new Menu(stats).getElement();
  render(mainElement, menu);

  controllerContent = new Page(mainElement, films, onDataChangeMain);
  controllerContent.init();

  const statsController = new StatsController(mainElement, films);

  render(mainElement, new Footer(stats).getElement(), `afterend`);

  menu.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (!evt.target.classList.contains(`main-navigation__item`)) {
      return;
    }

    const targetHrefCurrent = evt.target.href;
    const conditionSwitch = targetHrefCurrent.substr(targetHrefCurrent.lastIndexOf(`#`) + 1);

    const removeActiveItem = () => {
      menu.querySelectorAll(`.main-navigation__item`).forEach((item) => {
        item.classList.remove(`main-navigation__item--active`);
      });
    };

    removeActiveItem();
    evt.target.classList.add(`main-navigation__item--active`);

    switch (conditionSwitch) {
      case `all`:
        statsController.hideStats();
        controllerSearch.hideSearchResult();
        controllerContent.showPage(`all`);
        break;
      case `watchlist`:
        controllerContent.showPage(`watchlist`);
        controllerSearch.hideSearchResult();
        statsController.hideStats();
        break;
      case `history`:
        controllerContent.showPage(`history`);
        controllerSearch.hideSearchResult();
        statsController.hideStats();
        break;
      case `favorites`:
        controllerContent.showPage(`favorites`);
        controllerSearch.hideSearchResult();
        statsController.hideStats();
        break;
      case `stats`:
        controllerContent.hidePage();
        controllerSearch.hideSearchResult();
        statsController.init();
        break;
      default:
        break;
    }
  });

  const controllerSearch = new SearchController(mainElement, films, onDataChangeMain);

  search.getElement().querySelector(`.search__field`).addEventListener(`input`, (evt) => {
    evt.preventDefault();

    const query = search.getElement().querySelector(`.search__field`).value;
    if (query.length > 3) {
      debugger;
      controllerContent.hidePage();
      statsController.hideStats();
      controllerSearch.init(query);
    }
  });

  search.getElement().addEventListener(`reset`, (evt) => {
    evt.preventDefault();
    controllerContent.showPage();
    controllerSearch.hideSearchResult();
    statsController.hideStats();
  });
};

const onDataChangeMain = (popupIsOpen = false) => {
  api.getFilms()
    .then((films) => {
      const isStartApp = false;
      controllerContent._renderBoardFilms(isStartApp, films, popupIsOpen);
    });
};

api.getFilms()
  .then((films) => {
    startApp(films);
  });
