export const getAllBooks = "SELECT * FROM BOOKS";

export const getBookGenre = (bookId: number) => {
  return `SELECT Genres.GenreName from BookGenres JOIN Genres
  on BookGenres.GenreID = Genres.GenreID
  WHERE BookGenres.BookID = ${bookId}`;
};
