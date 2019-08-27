import Search from "./components/search";
import Profile from "./components/profile";
import Footer from "./components/footer";
import filmCards from "./data/cards";
import {render} from './components/utils';
import PageController from "./components/page-controller";

const headerElement = document.querySelector(`#header`);
render(headerElement, new Search().getElement());
render(headerElement, new Profile().getElement());

const mainElement = document.querySelector(`#main`);

render(mainElement, new Footer().getElement(), `afterend`);

const controllerContent = new PageController(mainElement, filmCards);
controllerContent.init();
