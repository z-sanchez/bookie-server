import { GraphQLError } from "graphql";
import { dbConnection } from "../../connectors/db.js";
import {
  addGenresToBooks,
  getAllBooks,
  getBookGenre,
  insertBooks,
} from "../../queries/books.js";
import { Book } from "../../types/Book.js";
import { BookDBResponse } from "../../types/dbResponses/Book.js";
import { GenreDBResponse } from "../../types/dbResponses/Genre.js";
import { ERROR_CODES } from "../../types/Error.js";
import { BookGenreInput, BookInput } from "../../types/graphql/BookInput.js";
import { Genre } from "../../types/Genre.js";

export class BookModel {
  async getBooks(): Promise<Book[] | GraphQLError> {
    try {
      const [results] = await dbConnection.query<BookDBResponse[]>(getAllBooks);

      return results.map((result) => {
        return {
          id: result.BookID,
          author: result.Author,
          title: result.Title,
          description: result.Description,
          price: result.Price,
          quantityAvailable: result.QuantityAvailable,
          imageURL: result.ImageUrl,
        };
      });
    } catch (error) {
      if (error.code === "ER_PARSE_ERROR") {
        return new GraphQLError(error.sqlMessage, {
          extensions: {
            code: ERROR_CODES.FAILED_TO_GET_BOOKS,
            sqlSnippet: error.sql,
          },
        });
      }
      return error;
    }
  }

  async getBookGenres(bookId: string): Promise<Genre[] | GraphQLError> {
    try {
      const [genreResults] = await dbConnection.query<GenreDBResponse[]>(
        getBookGenre(bookId)
      );

      return genreResults.map((genre) => {
        return { genreId: genre.GenreID, genreName: genre.GenreName };
      });
    } catch (error) {
      if (error.code === "ER_PARSE_ERROR") {
        return new GraphQLError(error.sqlMessage, {
          extensions: {
            code: ERROR_CODES.FAILED_TO_GET_BOOK_GENRE,
            sqlSnippet: error.sql,
          },
        });
      }
      return error;
    }
  }

  async storeBooks(books: BookInput[]): Promise<string> {
    await dbConnection.query(insertBooks(books));
    return "Books stored in DB successfully";
  }

  async addGenreToBook(input: BookGenreInput[]): Promise<string> {
    await dbConnection.query(addGenresToBooks(input));
    return "Genres were added to Books in DB successfully";
  }
}
