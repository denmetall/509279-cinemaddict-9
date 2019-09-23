export default class ModelFilm {
  constructor(data) {
    this.id = data[`id`] || null;
    this.title = data[`film_info`][`title`] || ``;
    this.year = data[`film_info`][`release`][`date`] || null;
    this.duration = data[`film_info`][`runtime`] || null;
    this.genre = data[`film_info`][`genre`] || [];
    this.posterLink = `./${data[`film_info`][`poster`]}` || ``;
    this.description = data[`film_info`][`description`] || ``;
    this.controls = {
      isAddedToWatchlist: Boolean(data[`user_details`][`watchlist`]) || false,
      isMarkedAsWatched: Boolean(data[`user_details`][`already_watched`]) || false,
      isFavorite: Boolean(data[`user_details`][`favorite`]) || false
    };
    this.comments = [
      {
        id: Math.random(),
        smile: `smile.png`,
        text: `Interesting setting and a good cast`,
        author: `Tim Macoveev`,
        date: `3 days ago`
      },
      {
        id: Math.random(),
        smile: `sleeping.png`,
        text: `Booooooooooring`,
        author: `ohn Doe`,
        date: `1 days ago`
      },
      {
        id: Math.random(),
        smile: `puke.png`,
        text: `Very very old. Meh`,
        author: `John Doe`,
        date: `today`
      }
    ];
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}
