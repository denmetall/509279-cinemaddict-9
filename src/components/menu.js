import AbstractComponent from "./abstract-component";

export default class Menu extends AbstractComponent {
  constructor(stats) {
    super();
    this._stats = stats;
  }

  getTemplate() {
    return `
      <nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._stats.watchlistNumber}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._stats.historyNumber}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._stats.favoritesNumber}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>
    `;
  }
}

