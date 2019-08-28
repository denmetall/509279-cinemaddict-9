import stats from './stats';
import AbstractComponent from "./abstract-component";

export default class Footer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <footer id="footer" class="footer">
        <section class="footer__logo logo logo--smaller">Cinemaddict</section>
        <section class="footer__statistics">
          <p>${stats.allFilmsNumber} movies inside</p>
        </section>
      </footer>
    `;
  }
}
