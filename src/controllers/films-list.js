import MovieController from "./movie";

export default class FilmsListController {
  constructor(container, dataFilmsForRendering, primaryDataFilms, renderBoardFilms) {
    this._container = container;
    this._dataFilmsForRendering = dataFilmsForRendering;
    this._primaryDataFilms = primaryDataFilms;
    this._renderBoardFilms = renderBoardFilms;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    this._container.innerHTML = ``;
    this._dataFilmsForRendering.forEach((film) => this._renderFilm(film, this._container));
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
      // Раньше это был объект this._card (который остался в pageController)
      // Я попробовал его передать с названием this._primaryDataFilms (так как объект передается по ссылке))
      // Но теперь при добавлении или удалении комментария удаляются все комменты во всех карточках((
      // Причем я сначала вынес CommentsController все работало, а когда вынес еще и FilmsListController перестало работать
      this._primaryDataFilms[this._primaryDataFilms.findIndex((it) => it === oldData)].controls = newData.controls;
    }
    this._renderBoardFilms();
  }

  _onDataChangeComments(newData, oldData, commentId) {
    if (commentId) {
      const commentsListData = this._primaryDataFilms[this._primaryDataFilms.findIndex((it) => it === oldData)].comments;
      const indexInCards = this._primaryDataFilms.findIndex((it) => it === oldData);
      const indexInArrayCommentsList = commentsListData.findIndex((comment) => comment.id === commentId);
      this._primaryDataFilms[indexInCards].comments.splice(indexInArrayCommentsList, 1);
    } else {
      this._primaryDataFilms[this._primaryDataFilms.findIndex((it) => it === oldData)].comments.push(newData);
    }
  }
}
