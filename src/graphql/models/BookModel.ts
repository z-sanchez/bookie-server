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

export class BookModel {
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
            genres: [
              ...genreResults.map((genre) => {
                return { genreName: genre.GenreName, genreId: genre.GenreID };
              }),
            ],
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
    await dbConnection.query(insertBooks(books));

    return "Books stored in DB successfully";
  }

  async addGenreToBook(input: BookGenreInput[]): Promise<string> {
    await dbConnection.query(addGenresToBooks(input));
    return "Genres were added to Books in DB successfully";
  }
}
