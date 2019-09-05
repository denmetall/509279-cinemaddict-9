import AbstractComponent from "./abstract-component";

export default class MostCommentedFilms extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
  
        <div id="most-commented-films" class="films-list__container">

        </div>
      </section>
    `;
  }
}
