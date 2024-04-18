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

export const doesGenreExist = (genreName: string) => {
  const normalizedGenreName = genreName.toLowerCase().replace(/ /g, "");

  return `SELECT Case when exists (select 1 from Genres where REPLACE(GenreName, ' ', '') = "${normalizedGenreName}") then TRUE else FALSE END AS value_exists;`;
};
