import AbstractComponent from "./abstract-component";

export default class Profile extends AbstractComponent {
  constructor(historyNumber = 0) {
    super();
    this._historyNumber = historyNumber;
  }

  getTemplate() {
    return `
      <section class="header__profile profile">
        <p class="profile__rating">${this._historyNumber > 0 ? this._getNameUser(this._historyNumber) : 0}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>
    `;
  }

  _getNameUser(historyNumber) {
    let userName = ``;

    if (historyNumber > 0 && historyNumber < 10) {
      userName = `Novice`;
    } else if (historyNumber > 10 && historyNumber < 21) {
      userName = `Fan`;
    } else {
      userName = `Movie Buff`;
    }

    return userName;
  }
}
