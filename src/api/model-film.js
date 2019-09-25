import moment from "moment";

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
    this.alternativeTitle = data[`film_info`][`alternative_title`] || ``;
    this.totalRating = data[`film_info`][`total_rating`] || 0;
    this.releaseCountry = data[`film_info`][`release`][`release_country`] || ``;
    this.director = data[`film_info`][`director`] || ``;
    this.ageRating = data[`film_info`][`age_rating`] || 0;
    this.actors = data[`film_info`][`actors`] || [];
    this.writers = data[`film_info`][`writers`] || [];
    this.comments = data[`comments`];

    this.personalRating = data[`user_details`][`personal_rating`] || ``;
    this.watchingDate = moment(data[`user_details`][`watching_date`]).format() || null;
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
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

