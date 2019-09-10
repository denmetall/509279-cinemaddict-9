import AbstractComponent from "./abstract-component";

export default class Films extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="films"></section>
    `;
  }
}
