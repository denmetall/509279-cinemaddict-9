import Search from "./components/search";
import Profile from "./components/profile";
import Footer from "./components/footer";
import {render, getStats, unrender} from './utils';
import Page from "./controllers/page";
import SearchController from "./controllers/serarch";
import StatsController from "./controllers/stats";
import API from "./api/api";
import NoFilms from "./components/no-flims";
import {END_POINT, AUTHORIZATION} from "./config";
import MenuController from "./controllers/menu";

const headerElement = document.querySelector(`#header`);
const search = new Search();
render(headerElement, search.getElement());

const mainElement = document.querySelector(`#main`);
const loading = new NoFilms(`Loading`);
render(mainElement, loading.getElement());

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

let controllerContent = null;
let controllerMenu = null;
let statsController = null;
let controllerSearch = null;

const startApp = (films) => {
  unrender(loading.getElement());
  loading.removeElement();

  const stats = getStats(films);

  render(headerElement, new Profile(stats.historyNumber).getElement());

  controllerContent = new Page(mainElement, films, onDataChangeMain);
  controllerContent.init();

  statsController = new StatsController(mainElement, films);

  render(mainElement, new Footer(stats).getElement(), `afterend`);

  controllerSearch = new SearchController(mainElement, films, onDataChangeMain);

  controllerMenu = new MenuController(mainElement, films, statsController, controllerSearch, controllerContent);
  controllerMenu.init();

  const searchField = search.getElement().querySelector(`.search__field`);

  const resetSearch = (evt) => {
    evt.preventDefault();
    controllerContent.showPage();
    controllerSearch.hideSearchResult();
    statsController.hideStats();
    searchField.value = ``;
  };

  searchField.addEventListener(`input`, (evt) => {
    evt.preventDefault();
    const query = search.getElement().querySelector(`.search__field`).value;

    if (query.length === 0) {
      resetSearch(evt);
      return;
    }

    if (query.length > 3) {
      controllerContent.hidePage();
      statsController.hideStats();
      controllerSearch.init(query);
    }
  });

  search.getElement().addEventListener(`reset`, resetSearch);
};

const onDataChangeMain = (popupIsOpen = false) => {
  api.getFilms()
    .then((films) => {
      const isStartApp = false;
      controllerContent._renderBoardFilms(isStartApp, films, popupIsOpen);
      controllerMenu.remove();
      statsController = new StatsController(mainElement, films);
      controllerMenu = new MenuController(mainElement, films, statsController, controllerSearch, controllerContent);
      controllerMenu.init();
    });
};

api.getFilms()
  .then((films) => {
    startApp(films);
  });
