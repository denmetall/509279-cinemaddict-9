import Statistic from "../components/statistic";
import {render, getStats, unrender} from "../utils";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

export default class StatsController {
  constructor(container, data) {
    this._container = container;
    this._data = data.filter((film) => film.controls.isMarkedAsWatched);
    this._dataForRender = [];
    this._statistic = null;
  }

  init(filter = `all-time`) {
    this._setDataForRender(filter);
    this._statistic = new Statistic(getStats(this._dataForRender), this._getTopGenre(), this._dataForRender);

    this._getAllListGenres(this._dataForRender);
    render(this._container, this._statistic.getElement());
    this._setFilterEvent();

    this._renderCharts();
  }

  _setFilterEvent() {
    const allFilterInput = this._statistic.getElement().querySelectorAll(`.statistic__filters-input`);
    allFilterInput.forEach((input) => {
      input.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        unrender(this._statistic.getElement());
        this._statistic.removeElement();
        this.init(evt.target.value);
      });
    });
  }

  _setDataForRender(filter) {
    switch (filter) {
      case `all-time`:
        this._dataForRender = this._data;
        break;
      case `today`:
        this._dataForRender = this._data.filter((film) => moment().isSame(moment(film.watchingDate), `day`));
        break;
      case `week`:
        this._dataForRender = this._data.filter((film) => moment(film.watchingDate) > moment().subtract(1, `w`));
        break;
      case `month`:
        this._dataForRender = this._data.filter((film) => moment(film.watchingDate) > moment().subtract(1, `months`));
        break;
      case `year`:
        this._dataForRender = this._data.filter((film) => moment(film.watchingDate) > moment().subtract(1, `y`));
        break;
      default:
        break;
    }
  }

  _getAllListGenres(data) {
    const genresWithDoubles = [];
    data.forEach((film) => {
      genresWithDoubles.push(...film.genre);
    });
    const genres = new Set([...genresWithDoubles]);
    return Array.from(genres);
  }

  hideStats() {
    unrender(this._statistic.getElement());
    this._statistic.removeElement();
  }

  _renderCharts() {
    const chartContainer = this._container.querySelector(`.statistic__chart`);

    return new Chart(chartContainer, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(this._getCountGenres(this._dataForRender))],
        datasets: [{
          data: [...Object.values(this._getCountGenres(this._dataForRender))],
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#fff`,
        }],
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  _getCountGenres(films) {
    const listGenresArray = this._getAllListGenres(films);
    const genresCounter = {};

    listGenresArray.forEach((genre) => {
      genresCounter[genre] = 0;
    });

    films.forEach((film) => {
      film.genre.forEach((item) => {
        genresCounter[item] += 1;
      });
    });

    return genresCounter;
  }

  _getTopGenre() {
    const countGenres = this._getCountGenres(this._dataForRender);
    let maxCount = 0;
    let topGenre = ``;

    for (let genre in countGenres) {
      if (countGenres[genre] > maxCount) {
        maxCount = countGenres[genre];
        topGenre = genre;
      }
    }

    return topGenre;
  }
}
