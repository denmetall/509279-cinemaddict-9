import stats from './stats';
import {createElement} from "./utils";

export default class Footer {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `
      <footer id="footer" class="footer">
        <section class="footer__logo logo logo--smaller">Cinemaddict</section>
        <section class="footer__statistics">
          <p>${stats.allFilmsNumber} movies inside</p>
        </section>
      </footer>
    `.trim();
  }
}
