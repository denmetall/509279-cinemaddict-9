const COUNT_FILMS = 8;
const films = [];

export const generateFilmData = () => {
  return {
    title: [
      `Остров проклятых`,
      `Форсаж`,
      `Астрал`,
      `Неоспоримый`
    ][Math.floor(Math.random() * 4)],
    rating: 8.3,
    year: 1929,
    duration: `1h 55m`,
    genre: `Musical`,
    posterLink: `./images/posters/the-dance-of-life.jpg`,
    description: `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr...`,
    numberComments: 5,
    controls: {
      isAddedToWatchlist: true,
      isMarkedAsWatched: true,
      isFavorite: false
    }
  };
};

for (let i = 0; i < COUNT_FILMS; i++) {
  films.push(generateFilmData());
}

export default films;
