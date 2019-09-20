import AbstractComponent from "./abstract-component";

export default class SearchInfo extends AbstractComponent {
  constructor(count = 0) {
    super();
    this._count = count;
  }

  getTemplate() {
    return `
      <div class="result">
        <p class="result__text">Result <span class="result__count">${this._count}</span></p>
      </div>
    `;
  }
}
