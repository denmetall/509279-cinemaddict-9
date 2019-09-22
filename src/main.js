import Search from "./components/search";
import Profile from "./components/profile";
import Menu from "./components/menu";
import Footer from "./components/footer";
import filmCards from "./data/cards";
import {render, getStats} from './utils';
import Page from "./controllers/page";
import SearchController from "./controllers/serarch";
import StatsController from "./controllers/stats";

const headerElement = document.querySelector(`#header`);
const search = new Search();
render(headerElement, search.getElement());

const stats = getStats(filmCards);

render(headerElement, new Profile(stats).getElement());

const mainElement = document.querySelector(`#main`);
const menu = new Menu(stats).getElement();
render(mainElement, menu);

const controllerContent = new Page(mainElement, filmCards);
controllerContent.init();

const statsController = new StatsController(mainElement, filmCards);

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
      statsController.hideStats();
      break;
    case `history`:
      controllerContent.showPage(`history`);
      statsController.hideStats();
      break;
    case `favorites`:
      controllerContent.showPage(`favorites`);
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

const controllerSearch = new SearchController(mainElement, filmCards);

search.getElement().querySelector(`.search__field`).addEventListener(`input`, (evt) => {
  evt.preventDefault();

  const query = search.getElement().querySelector(`.search__field`).value;
  if (query.length > 3) {
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


