import AbstractComponent from "./abstract-component";

export default class Footer extends AbstractComponent {
  constructor(stats) {
    super();
    this._stats = stats;
  }

  getTemplate() {
    return `
      <footer id="footer" class="footer">
        <section class="footer__logo logo logo--smaller">Cinemaddict</section>
        <section class="footer__statistics">
          <p>${this._stats.allFilmsNumber} movies inside</p>
        </section>
      </footer>
    `;
  }
}
