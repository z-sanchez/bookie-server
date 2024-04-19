import { GraphQLError } from "graphql";
import { dbConnection } from "../../connectors/db.js";
import {
  addGenresToBooks,
  getAllBooks,
  getBookCount,
  getLastBookInserted,
  insertBooks,
  searchBooks,
} from "../../queries/books.js";
import { Book, SearchBooks } from "../../types/Book.js";
import {
  BookDBResponse,
  SearchBooksDBResponse,
} from "../../types/dbResponses/Book.js";
import { ERROR_CODES } from "../../types/Error.js";
import {
  BookGenreInput,
  BookInput,
  SearchBooksInput,
} from "../../types/graphql/BookInput.js";
import { searchHasMoreResults } from "../../helpers/books.js";
import fs from "fs";
import { GenreModel } from "./GenreModel.js";
import { EXPORTED_BOOKS_FILENAME } from "../../utils/constants.js";
import { GenreDBResponse } from "../../types/dbResponses/Genre.js";

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
    try {
      //take book input with optional genre array (only name)
      //auto assign bookIDs
      //iterate through genre array
      //if no match for genre name (even in lowercase and no spacing), add genre using model
      //add GenreToBook using this model
      //add books as usual
      const Genres = new GenreModel();

      books.forEach(async (book) => {
        //add and return book from DB
        //store bookID
        await dbConnection.query(insertBooks([book]));
        const [bookResult] = await dbConnection.query<BookDBResponse[]>(
          getLastBookInserted()
        );

        const bookID = bookResult.at(0);

        if (book.genres) {
          book.genres.forEach(async (genre) => {
            const doesGenreExist = await Genres.doesGenreExist(genre);
            let genreID = null;

            if (!doesGenreExist) {
              Genres.addGenres([genre]);
              const insertedGenre = await Genres.getLastInsertedGenre();
              genreID = insertedGenre.GenreID;
            }
            //if genreDoesNotExist, add and return ID
            //else getGenreId
            //add bookID and GenreID to BookGenre
            console.log({ doesGenreExist, genre });
          });
        }
      });
      // await dbConnection.query(insertBooks(books));
      return "Books stored in DB successfully";
    } catch (error) {
      return error;
    }
    //dont forget to adjust the apis for Genres, DB changes were made

    //will need this query later
    // -- INSERT INTO Genres (GenreName) VALUES ( "Children's");
    // -- SELECT *
    // -- FROM Genres
    // -- WHERE GenreID = (SELECT LAST_INSERT_ID());
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
          limitedResultCount: results.length,
          offset: input.startingIndex,
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

  async exportBooksToJSON(): Promise<boolean> {
    const genreModel = new GenreModel();
    const books = (await this.getBooks()) as Book[];
    const booksWithGenreInfo = await Promise.all(
      books.map(async (book) => {
        return {
          ...book,
          genres: await genreModel.getBookGenres(book.id),
        };
      })
    );

    const filePath = EXPORTED_BOOKS_FILENAME;
    const jsonData = JSON.stringify(booksWithGenreInfo);

    try {
      fs.writeFileSync(filePath, jsonData);
      console.log("JSON data saved to file successfully.");
      return true;
    } catch (error) {
      console.error("Error writing JSON data to file:", error);
      return false;
    }
  }
}
