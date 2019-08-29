import AbstractComponent from "./abstract-component";

export default class Sort extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <ul class="sort">
        <li><a href="#" class="sort__button sort__button--active" data-sort-type="default">Sort by default</a></li>
        <li><a href="#" class="sort__button" data-sort-type="sort-date">Sort by date</a></li>
        <li><a href="#" class="sort__button" data-sort-type="sort-rating">Sort by rating</a></li>
      </ul>
    `;
  }
}
