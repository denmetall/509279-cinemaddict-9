import Search from "./components/search";
import Profile from "./components/profile";
import Menu from "./components/menu";
import Footer from "./components/footer";
import filmCards from "./data/cards";
import {render} from './components/utils';
import Page from "./controllers/page";

const headerElement = document.querySelector(`#header`);
render(headerElement, new Search().getElement());
render(headerElement, new Profile().getElement());

const mainElement = document.querySelector(`#main`);
render(mainElement, new Menu().getElement());

render(mainElement, new Footer().getElement(), `afterend`);

const controllerContent = new Page(mainElement, filmCards);
controllerContent.init();
