import Search from "./components/search";
import Profile from "./components/profile";
import Menu from "./components/menu";
import Statistic from "./components/statistic";
import Footer from "./components/footer";
import filmCards from "./data/cards";
import {render} from './components/utils';
import Page from "./controllers/page";

const headerElement = document.querySelector(`#header`);
render(headerElement, new Search().getElement());
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
