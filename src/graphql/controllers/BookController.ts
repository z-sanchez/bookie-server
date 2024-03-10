import { GraphQLError } from "graphql";
import { dbConnection } from "../../connectors/db.js";
import { getAllBooks, getBookGenre } from "../../queries/books.js";
import { Book } from "../../types/Book.js";
import {
  BookDBResponse,
  GenreDBResponse,
} from "../../types/dbResponses/Book.js";
import { ERROR_CODES } from "../../types/Error.js";
import { BookInput } from "../../types/graphql/BookInput.js";

export class BookController {
  async getBooks() {
    try {
      const [results] = await dbConnection.query<BookDBResponse[]>(getAllBooks);

      const mappedResults: Book[] = await Promise.all(
        results.map(async (result) => {
          const [genreResults] = await dbConnection.query<GenreDBResponse[]>(
            getBookGenre(result.BookID)
          );

          return {
            id: result.BookID,
            author: result.Author,
            title: result.Title,
            description: result.Description,
            price: result.Price,
            quantityAvailable: result.QuantityAvailable,
            imageURL: result.ImageUrl,
            genres: [...genreResults.map((genre) => genre.GenreName)],
          };
        })
      );

      return mappedResults;
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
    console.log("Got Books", { books });

    return "Books stored in DB successfully";
  }
}
