export const getAllGenres = "select * from Genres;";

export const insertGenres = (genres: string[]) => {
  return `INSERT into Genres (GenreName) VALUES ${genres.map((genre) => {
    return `("${genre}")`;
  })};`;
};

export const doesGenreExist = (genreName: string) => {
  const normalizedGenreName = genreName.toLowerCase().replace(/ /g, "");

  return `SELECT Case when exists (select 1 from Genres where REPLACE(GenreName, ' ', '') = "${normalizedGenreName}") then TRUE else FALSE END AS value_exists;`;
};

export const getLastInsertedGenre = () => {
  return "SELECT * FROM Genres WHERE GenreID = (SELECT LAST_INSERT_ID());";
};
