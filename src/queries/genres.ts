export const getAllBooks = "SELECT * FROM BOOKS";

export const insertGenres = (
  genres: { genreId: string; genreName: string }[]
) => {
  return `INSERT into Genres (GenreID, GenreName) VALUES ${genres.map(
    (genre) => {
      return `("${genre.genreId}","${genre.genreName}")`;
    }
  )}`;
};
