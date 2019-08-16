import stats from './stats';

export default () => {
  return `
    <footer id="footer" class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
        <p>${stats.allFilmsNumber} movies inside</p>
      </section>
    </footer>
  `;
};
