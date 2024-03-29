import { GraphQLError } from "graphql";
import { dbConnection } from "../../connectors/db.ts";
import {
  addGenresToBooks,
  getAllBooks,
  getBookCount,
  insertBooks,
  searchBooks,
} from "../../queries/books.ts";
import { Book, SearchBooks } from "../../types/Book.ts";
import {
  BookDBResponse,
  SearchBooksDBResponse,
} from "../../types/dbResponses/Book.ts";
import { ERROR_CODES } from "../../types/Error.ts";
import {
  BookGenreInput,
  BookInput,
  SearchBooksInput,
} from "../../types/graphql/BookInput.ts";
import { searchHasMoreResults } from "../../helpers/books.ts";

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

  async searchBooks(
    input: SearchBooksInput
  ): Promise<SearchBooks | GraphQLError> {
    try {
      const [bookCountResult] = await dbConnection.query<
        SearchBooksDBResponse[]
      >(getBookCount(input.term));
      const [results] = await dbConnection.query<BookDBResponse[]>(
        searchBooks(input)
      );

      const totalBookCount = bookCountResult.at(0).bookCount;

      return {
        books: results.map((result) => {
          return {
            id: result.BookID,
            author: result.Author,
            title: result.Title,
            description: result.Description,
            price: result.Price,
            quantityAvailable: result.QuantityAvailable,
            imageURL: result.ImageUrl,
          };
        }),
        moreResults: searchHasMoreResults({
          resultCount: results.length,
          startingIndex: input.startingIndex,
          totalResultCount: totalBookCount,
        }),
      };
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
