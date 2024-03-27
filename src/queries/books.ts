import { BookInput } from "../types/graphql/BookInput.js";

export const getAllBooks = "SELECT * FROM BOOKS";

export const getBookGenre = (bookId: string) => {
  return `SELECT * from BookGenres JOIN Genres
  on BookGenres.GenreID = Genres.GenreID
  WHERE BookGenres.BookID = ${bookId}`;
};

export const insertBooks = (books: BookInput[]) => {
  return `insert into Books 
  (BookID, Author, Title, Description, Price, QuantityAvailable, ImageURL)
  values ${books.map((book) => {
    return `("${book.id}","${book.author}","${book.title}","${book.description}","${book.price}","${book.quantityAvailable}","${book.imageURL}")`;
  })}`;
};

export const addGenresToBooks = (
  data: { bookId: string; genreId: string }[]
) => {
  return `insert into BookGenres (BookID, GenreID) values ${data.map(
    (entry) => {
      return `("${entry.bookId}","${entry.genreId}")`;
    }
  )}`;
};

export const searchBooks = (term: string) => {
  return `select * from Books WHERE Title LIKE '%${term}%'`;
};

export const getBookCount = () => {
  return `select count(BookID) as bookCount from Books`;
};
