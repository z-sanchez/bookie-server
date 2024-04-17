export const getAllGenres = "select * from Genres;";

export const insertGenres = (
  genres: { genreId: string; genreName: string }[]
) => {
  return `INSERT into Genres (GenreID, GenreName) VALUES ${genres.map(
    (genre) => {
      return `("${genre.genreId}","${genre.genreName}")`;
    }
  )}`;
};

export const selectGenreByName = (genreName: string) => {
  const normalizedGenreName = genreName.toLowerCase().replace(/ /g, "");

  return `SELECT * FROM Genres WHERE REPLACE(GenreName, ' ', '') = ${normalizedGenreName} LIMIT 1`;
};
