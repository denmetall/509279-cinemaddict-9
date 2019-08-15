import createSearchTemplate from "./components/search";
import createProfileTemplate from "./components/profile";
import createMenuTemplate from "./components/menu";
import createSortTemplate from "./components/sort";
import createFilmsTemplate from "./components/films";
import createCardTemplate from "./components/film-card";
import createBtnMoreTemplate from "./components/btn-more";
import createPopupTemplate from "./components/popup";
import filmCardsData from "./data/cards";

const NUMBER_SHOW_FILMS = 5;
const NUMBER_SHOW_TOP_RATED_FILMS = 2;
const NUMBER_SHOW_MOST_COMMENTED_FILMS = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`#header`);
render(headerElement, createSearchTemplate());
render(headerElement, createProfileTemplate());

const mainElement = document.querySelector(`#main`);
render(mainElement, createMenuTemplate());
render(mainElement, createSortTemplate());
render(mainElement, createFilmsTemplate());

const allFilmsContainer = mainElement.querySelector(`#all-films`);
const topRatedFilmsContainer = mainElement.querySelector(`#top-rated-films`);
const mostCommentedFilmsContainer = mainElement.querySelector(`#most-commented-films`);

const renderFilms = (container, count) => {
  let numberCurrentFilms = 0;
  if (container.querySelectorAll(`.film-card`).length) {
    numberCurrentFilms = container.querySelectorAll(`.film-card`).length;
  }
  if (filmCardsData.length <= count) {
    count = filmCardsData.length;
  }

  const films = filmCardsData.slice(numberCurrentFilms, count);
  container.insertAdjacentHTML(`beforeend`, films.map(createCardTemplate).join(`\n`));
};

renderFilms(allFilmsContainer, NUMBER_SHOW_FILMS);
renderFilms(topRatedFilmsContainer, NUMBER_SHOW_TOP_RATED_FILMS);
renderFilms(mostCommentedFilmsContainer, NUMBER_SHOW_MOST_COMMENTED_FILMS);

if (filmCardsData.length > NUMBER_SHOW_FILMS) {
  const filmsListElement = mainElement.querySelector(`#films-list`);
  render(filmsListElement, createBtnMoreTemplate());

  const btnMoreElement = filmsListElement.querySelector(`#load-more`);

  btnMoreElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    let filmsCount = filmsListElement.querySelectorAll(`.film-card`).length;

    renderFilms(allFilmsContainer, filmsCount + NUMBER_SHOW_FILMS);

    if ((filmsCount + NUMBER_SHOW_FILMS) >= filmCardsData.length) {
      btnMoreElement.style.display = `none`;
    }
  });
}

// const footerElement = document.querySelector(`footer`);
// render(footerElement, createPopupTemplate());
