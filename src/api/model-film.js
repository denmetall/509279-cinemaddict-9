import moment from "moment";

export default class ModelFilm {
  constructor(dataFilm) {
    this.id = dataFilm[`id`] || null;
    this.title = dataFilm[`film_info`][`title`] || ``;
    this.year = dataFilm[`film_info`][`release`][`date`] || null;
    this.duration = dataFilm[`film_info`][`runtime`] || null;
    this.genre = dataFilm[`film_info`][`genre`] || [];
    this.posterLink = `./${dataFilm[`film_info`][`poster`]}` || ``;
    this.description = dataFilm[`film_info`][`description`] || ``;
    this.controls = {
      isAddedToWatchlist: Boolean(dataFilm[`user_details`][`watchlist`]) || false,
      isMarkedAsWatched: Boolean(dataFilm[`user_details`][`already_watched`]) || false,
      isFavorite: Boolean(dataFilm[`user_details`][`favorite`]) || false
    };
    this.alternativeTitle = dataFilm[`film_info`][`alternative_title`] || ``;
    this.totalRating = dataFilm[`film_info`][`total_rating`] || 0;
    this.releaseCountry = dataFilm[`film_info`][`release`][`release_country`] || ``;
    this.director = dataFilm[`film_info`][`director`] || ``;
    this.ageRating = dataFilm[`film_info`][`age_rating`] || 0;
    this.actors = dataFilm[`film_info`][`actors`] || [];
    this.writers = dataFilm[`film_info`][`writers`] || [];
    this.comments = dataFilm[`comments`];

    this.personalRating = dataFilm[`user_details`][`personal_rating`] || ``;
    this.watchingDate = moment(dataFilm[`user_details`][`watching_date`]).format() || null;
  }

  static parseFilm(dataFilm) {
    return new ModelFilm(dataFilm);
  }

  static parseFilms(dataFilm) {
    return dataFilm.map(ModelFilm.parseFilm);
  }

  toRAW() {
    return {
      'film_info': {
        'poster': this.posterLink,
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'description': this.description,
        'runtime': this.duration,
        'total_rating': parseInt(this.totalRating, 10),
        'release': {
          'date': new Date(this.year),
          'release_country': this.releaseCountry,
        },
        'genre': [...this.genre.values()],
        'age_rating': this.ageRating,
        'actors': this.actors,
        'director': this.director,
        'writers': this.writers,
      },
      'user_details': {
        'already_watched': this.controls.isMarkedAsWatched,
        'favorite': this.controls.isFavorite,
        'watchlist': this.controls.isAddedToWatchlist,
        'personal_rating': parseInt(this.personalRating, 10) || 0,
        'watching_date': new Date(this.watchingDate) || null,
      },
      'comments': this.comments,
    };
  }
}

