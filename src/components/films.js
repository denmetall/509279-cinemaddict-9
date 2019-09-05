import AbstractComponent from "./abstract-component";

export default class Films extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="films">
        <section id="films-list" class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    
          <div id="all-films" class="films-list__container">
  
          </div>
  
        </section>
      </section>
    `;
  }
}
