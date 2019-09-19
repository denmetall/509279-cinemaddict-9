import MovieController from "./movie";

export default class FilmsList {
  constructor(filmsData, container, primaryFilmsData, renderBoardFilms) {
    this._filmsData = filmsData;
    this._container = container;
    this._primaryFilmsData = primaryFilmsData;
    this._renderBoardFilms = renderBoardFilms;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    this._container.innerHTML = ``;
    this._filmsData.forEach((film) => this._renderFilm(film, this._container));
  }

  _renderFilm(filmCard, container) {
    const movieController = new MovieController(container, filmCard, this._onDataChange, this._onChangeView);
    movieController.init();
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData, isChangeCommentsList = false, commentId = false) {
    if (isChangeCommentsList) {
      this._onDataChangeComments(newData, oldData, commentId);
    } else {
      this._primaryFilmsData[this._primaryFilmsData.findIndex((it) => it === oldData)].controls = newData.controls;
      // if (this._sortedFilm.length) {
      //   this._sortedFilm[this._sortedFilm.findIndex((it) => it === oldData)].controls = newData.controls;
      // }
    }
    this._renderBoardFilms();
  }

  _onDataChangeComments(newData, oldData, commentId) {
    if (commentId) {
      const commentsListData = this._primaryFilmsData[this._primaryFilmsData.findIndex((it) => it === oldData)].comments;
      const indexInCards = this._primaryFilmsData.findIndex((it) => it === oldData);
      const indexInArrayCommentsList = commentsListData.findIndex((comment) => comment.id === commentId);
      this._primaryFilmsData[indexInCards].comments.splice(indexInArrayCommentsList, 1);
      //
      // if (this._sortedFilm.length) {
      //   const commentsListData = this._sortedFilm[this._sortedFilm.findIndex((it) => it === oldData)].comments;
      //   const indexInCards = this._sortedFilm.findIndex((it) => it === oldData);
      //   const indexInArrayCommentsList = commentsListData.findIndex((comment) => comment.id === commentId);
      //   this._sortedFilm[indexInCards].comments.splice(indexInArrayCommentsList, 1);
      // }
    } else {
      this._primaryFilmsData[this._primaryFilmsData.findIndex((it) => it === oldData)].comments.push(newData);
      //
      // if (this._sortedFilm.length) {
      //   this._sortedFilm[this._sortedFilm.findIndex((it) => it === oldData)].comments.push(newData);
      // }
    }
  }
}
