import ModelFilm from "./model-film";
import {Status} from "../utils";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= Status.OK && response.status < Status.REDIRECTION) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (response) => {
  return response.json();
};

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(ModelFilm.parseFilms);
  }

  updateFilm(id, dataFilm) {
    return this._load({
      url: `movies/${id}`,
      method: `PUT`,
      body: JSON.stringify(dataFilm.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelFilm.parseFilm);
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(toJSON);
  }

  createComment(comment, filmId) {
    return this._load({
      url: `comments/${filmId}`,
      method: `POST`,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  deleteComment({commentId}) {
    return this._load({url: `comments/${commentId}`, method: `DELETE`});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
