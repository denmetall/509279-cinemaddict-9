import {getSearchTemplate} from "./components/search";
import {getProfileTemplate} from "./components/profile";
import {getMenuTemplate} from "./components/menu";
import {getSortTemplate} from "./components/sort";
import {getFilmsTemplate} from "./components/films";
// import {getPopupTemplate} from "./components/popup";

const headerElement = document.querySelector(`header`);
const mainElement = document.querySelector(`main`);
// const footerElement = document.querySelector(`footer`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, getSearchTemplate());
render(headerElement, getProfileTemplate());
render(mainElement, getMenuTemplate());
render(mainElement, getSortTemplate());
render(mainElement, getFilmsTemplate());
// render(footerElement, getPopupTemplate());
