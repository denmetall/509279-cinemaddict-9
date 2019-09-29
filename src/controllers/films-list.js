import MovieController from "./movie";
import API from "../api/api";
import {AUTHORIZATION, END_POINT} from "../config";

export default class FilmsList {
  constructor(filmsData, container, primaryFilmsData, renderUpdate, onDataChangeMain) {
    this._filmsData = filmsData;
    this._container = container;
    this._primaryFilmsData = primaryFilmsData;
    this._renderUpdate = renderUpdate;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
    this._onDataChangeMain = onDataChangeMain;
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
    // debugger;
    if (isChangeCommentsList) {
      this._onDataChangeComments(newData, oldData, commentId);
    } else {
      const dataForSend = oldData;
      dataForSend.controls = newData.controls;
      const filmId = oldData.id;
      this._api.updateFilm(filmId, dataForSend)
        .then(this._onDataChangeMain());
    }
    // this._renderUpdate();
    // this._onDataChangeMain(`update`, newData, oldData.id);
  }

  _onDataChangeComments(newData, oldData, commentId) {
    const movieId = oldData.id;
    if (commentId) {
      this._api.deleteComment({commentId})
        .then(this._onDataChangeMain());
    } else {
      this._api.createComment(newData, movieId)
        .then(this._onDataChangeMain());
      // Не удается создать коммент
      // this._primaryFilmsData[this._primaryFilmsData.findIndex((it) => it === oldData)].comments.push(newData);
    }
  }
}
