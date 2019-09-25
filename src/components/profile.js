import AbstractComponent from "./abstract-component";
import {getNameUser} from "../utils";

export default class Profile extends AbstractComponent {
  constructor(historyNumber = 0) {
    super();
    this._historyNumber = historyNumber;
  }

  getTemplate() {
    return `
      <section class="header__profile profile">
        <p class="profile__rating">${getNameUser(this._historyNumber)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>
    `;
  }
}
