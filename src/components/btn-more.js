import {createElement} from "./utils";

export default class BtnMore {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `
      <button id="load-more" class="films-list__show-more">Show more</button>
    `.trim();
  }
}
