import AbstractComponent from "./abstract-component";

export default class BtnMore extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button id="load-more" class="films-list__show-more">Show more</button>`;
  }
}
