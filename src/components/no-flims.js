import AbstractComponent from "./abstract-component";

export default class NoFilms extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    
          <div class="no-result">
            There are no movies in our database.
          </div>
        </section>
      </section>
    `;
  }
}
