import Statistic from "../components/statistic";
import {render} from "../components/utils";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class StatsController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._statistic = new Statistic();
  }

  init() {
    this._statistic.getElement().classList.remove(`visually-hidden`);
    render(this._container, this._statistic.getElement());
    this._renderCharts();
  }

  hideStats() {
    this._statistic.getElement().classList.add(`visually-hidden`);
  }

  _renderCharts() {
    const chartContainer = this._container.querySelector(`.statistic__chart`);

    return new Chart(chartContainer, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(this._getCountGenres(this._data))],
        datasets: [{
          data: [...Object.values(this._getCountGenres(this._data))],
          backgroundColor: `#ffe800`,
          anchor: `start`,
          hoverBackgroundColor: `#fff`,
        }],
      },
      options: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 10
          }
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  _getCountGenres(films) {
    const genresCounter = {
      horrors: 0,
      militant: 0,
      drama: 0,
      comedy: 0,
      adventures: 0,
      criminal: 0,
      fantasy: 0
    };

    films.forEach((film) => {
      genresCounter[film.genre] += 1;
    });

    return genresCounter;
  }
}
