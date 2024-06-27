import { BookInput, SearchBooksInput } from "../types/graphql/BookInput.js";

export const getAllBooks = "SELECT * FROM Books";

export const getBookGenre = (bookId: string) => {
  return `SELECT * from BookGenres JOIN Genres
  on BookGenres.GenreID = Genres.GenreID
  WHERE BookGenres.BookID = ${bookId}`;
};

export const insertBooks = (books: BookInput[]) => {
  return `insert into Books 
  (Author, Title, Description, Price, QuantityAvailable, ImageURL)
  values ${books.map((book) => {
    return `("${book.author}","${book.title}","${book.description}","${book.price}","${book.quantityAvailable}","${book.imageURL}")`;
  })};`;
};

export const getLastBookInserted = () => {
  return "SELECT * FROM Books WHERE BookID = (SELECT LAST_INSERT_ID());";
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

export const searchBooks = ({
  term,
  limit,
  startingIndex,
}: SearchBooksInput) => {
  return `select * from Books WHERE Title LIKE '%${term}%' AND BookID >= ${
    startingIndex ? startingIndex : 0
  } ${limit ? `limit ${limit}` : ""}`;
};

export const getBookCount = (term: string) => {
  return `select count(BookID) as bookCount from Books WHERE Title LIKE '%${term}%'`;
};
