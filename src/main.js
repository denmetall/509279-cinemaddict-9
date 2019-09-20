import Search from "./components/search";
import Profile from "./components/profile";
import Menu from "./components/menu";
import Statistic from "./components/statistic";
import Footer from "./components/footer";
import filmCards from "./data/cards";
import {render} from './components/utils';
import Page from "./controllers/page";
import SearchController from "./controllers/serarch";

const headerElement = document.querySelector(`#header`);
const search = new Search();
render(headerElement, search.getElement());

render(headerElement, new Profile().getElement());

const mainElement = document.querySelector(`#main`);
const menu = new Menu().getElement();
render(mainElement, menu);

const controllerContent = new Page(mainElement, filmCards);
controllerContent.init();

const statistic = new Statistic().getElement();
render(mainElement, statistic);

render(mainElement, new Footer().getElement(), `afterend`);

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
      statistic.classList.add(`visually-hidden`);
      controllerContent.showPage();
      break;
    case `watchlist`:
      // statistic.classList.add(`visually-hidden`);
      break;
    case `history`:
      // statistic.classList.add(`visually-hidden`);
      break;
    case `favorites`:
      // statistic.classList.add(`visually-hidden`);
      break;
    case `stats`:
      controllerContent.hidePage();
      statistic.classList.remove(`visually-hidden`);
      break;
    default:
      break;
  }
});

const controllerSearch = new SearchController(mainElement, filmCards);

search.getElement().addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  controllerContent.hidePage();
  statistic.classList.add(`visually-hidden`);

  const query = search.getElement().querySelector(`.search__field`).value;

  controllerSearch.init(query);
});

search.getElement().addEventListener(`reset`, (evt) => {
  evt.preventDefault();
  controllerContent.showPage();
  statistic.classList.add(`visually-hidden`);
});


