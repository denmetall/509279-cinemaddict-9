const COUNT_FILMS = 16;
const films = [];

export const generateFilmData = () => {
  return {
    title: [
      `Остров проклятых`,
      `Форсаж`,
      `Астрал`,
      `Неоспоримый`,
      `Побег из Шоушенка`,
      `Крестный отец`,
      `Пираты Карибского моря`,
      `Властелин колец`,
      `Джентльмены удачи`,
      `Изгой`,
      `Шестое чувство`,
      `Укрощение строптивого`,
      `Брат`,
      `Назад в будущее 3`,
      `Блеф`
    ][Math.floor(Math.random() * 15)],
    rating: (7 + Math.floor(Math.random() * 3)),
    year: (1980 + Math.floor(Math.random() * 37)),
    duration: `2h ${Math.floor(Math.random() * 55)}m`,
    genre: [
      `Ужасы`,
      `Боевик`,
      `Драма`,
      `Комедия`,
      `Приключения`,
      `Драма`,
      `Криминал`,
      `Фантастика`
    ][Math.floor(Math.random() * 7)],
    posterLink: [
      `made-for-each-other.png`,
      `the-dance-of-life.jpg`,
      `popeye-meets-sinbad.png`,
      `sagebrush-trail.jpg`,
      `santa-claus-conquers-the-martians.jpg`,
      `the-great-flamarion.jpg`,
      `the-man-with-the-golden-arm.jpg`
    ][Math.floor(Math.random() * 7)],
    description:
      new Array(1 + Math.floor(Math.random() * 2))
        .fill(
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
            .split(`. `)[Math.floor(Math.random() * 11)]
        )
        .join(`. `),
    numberComments: Math.floor(Math.random() * 10),
    controls: {
      isAddedToWatchlist: Boolean(Math.round(Math.random())),
      isMarkedAsWatched: Boolean(Math.round(Math.random())),
      isFavorite: Boolean(Math.round(Math.random()))
    }
  };
};

for (let i = 0; i < COUNT_FILMS; i++) {
  films.push(generateFilmData());
}

export default films;
