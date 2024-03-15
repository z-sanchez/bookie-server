import { getAllGenres, insertGenres } from "../../queries/genres.js";
import { GenreInput } from "../../types/graphql/GenreInput.js";
import { dbConnection } from "../../connectors/db.js";
import { GenreDBResponse } from "../../types/dbResponses/Genre.js";
import { Genre } from "../../types/Genre.js";
import { getBookGenre } from "../../queries/books.js";
import { GraphQLError } from "graphql";
import { ERROR_CODES } from "../../types/Error.js";

export class GenreModel {
  async getGenres(): Promise<Genre[]> {
    const [results] = await dbConnection.query<GenreDBResponse[]>(getAllGenres);

    return results.map((genre) => {
      return {
        genreId: genre.GenreID,
        genreName: genre.GenreName,
      };
    });
  }

  async addGenres(genres: GenreInput[]) {
    await dbConnection.query(insertGenres(genres));
    return "Genres add to DB successfully";
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
}
