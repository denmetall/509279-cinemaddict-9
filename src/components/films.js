import {getCardTemplate} from "./film-card";
import {getBtnMoreTemplate} from "./btn-more";

export const getFilmsTemplate = () => {
  return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  
        <div class="films-list__container">
          ${getCardTemplate()}
          ${getCardTemplate()}
          ${getCardTemplate()}
          ${getCardTemplate()}
          ${getCardTemplate()}
        </div>
  
        ${getBtnMoreTemplate()}
      </section>
  
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
  
        <div class="films-list__container">
          ${getCardTemplate()}
          ${getCardTemplate()}
        </div>
      </section>
  
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
  
        <div class="films-list__container">
          ${getCardTemplate()}
          ${getCardTemplate()}
        </div>
      </section>
    </section>
  `;
};
