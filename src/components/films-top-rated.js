import AbstractComponent from "./abstract-component";

export default class FilmsTopRated extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div id="top-rated-films" class="films-list__container"></div>
      </section>
    `;
  }
}
