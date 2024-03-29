import { getAllGenres, insertGenres } from "../../queries/genres.ts";
import { GenreInput } from "../../types/graphql/GenreInput.ts";
import { dbConnection } from "../../connectors/db.ts";
import { GenreDBResponse } from "../../types/dbResponses/Genre.ts";
import { Genre } from "../../types/Genre.ts";
import { getBookGenre } from "../../queries/books.ts";
import { GraphQLError } from "graphql";
import { ERROR_CODES } from "../../types/Error.ts";

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
