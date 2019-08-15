import stats from './stats';

export default () => {
  return `
    <section class="header__profile profile">
      <p class="profile__rating">${stats.historyNumber}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};
