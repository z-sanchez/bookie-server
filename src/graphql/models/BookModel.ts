import { GraphQLError } from "graphql";
import { dbConnection } from "../../connectors/db.js";
import {
  addGenresToBooks,
  getAllBooks,
  insertBooks,
  searchBooks,
} from "../../queries/books.js";
import { Book } from "../../types/Book.js";
import { BookDBResponse } from "../../types/dbResponses/Book.js";
import { ERROR_CODES } from "../../types/Error.js";
import { BookGenreInput, BookInput } from "../../types/graphql/BookInput.js";

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

  async storeBooks(books: BookInput[]): Promise<string> {
    await dbConnection.query(insertBooks(books));
    return "Books stored in DB successfully";
  }

  async addGenreToBook(input: BookGenreInput[]): Promise<string> {
    await dbConnection.query(addGenresToBooks(input));
    return "Genres were added to Books in DB successfully";
  }

  async searchBooks(searchTerm: string): Promise<Book[] | GraphQLError> {
    try {
      const [results] = await dbConnection.query<BookDBResponse[]>(
        searchBooks(searchTerm)
      );

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
            code: ERROR_CODES.FAILED_TO_SEARCH_BOOKS,
            sqlSnippet: error.sql,
          },
        });
      }
      return error;
    }
  }
}
