import Statistic from "../components/statistic";
import {render} from "../components/utils";

export default class StatsController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._statistic = new Statistic();
  }

  init() {
    this._statistic.getElement().classList.remove(`visually-hidden`);
    render(this._container, this._statistic.getElement());
  }

  hideStats() {
    this._statistic.getElement().classList.add(`visually-hidden`);
  }
}
