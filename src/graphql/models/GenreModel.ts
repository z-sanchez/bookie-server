import {
  doesGenreExist,
  getAllGenres,
  getGenreByName,
  insertGenres,
  getLastInsertedGenre as lastInsertedGenreQuery,
} from "../../queries/genres.js";
import { dbConnection } from "../../connectors/db.js";
import {
  GenreDBResponse,
  GenreExistDBResponse,
} from "../../types/dbResponses/Genre.js";
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

  async getGenreByName(genreName: string) {
    const [genreResult] = await dbConnection.query<GenreDBResponse[]>(
      getGenreByName(genreName)
    );

    return genreResult.at(0);
  }

  async addGenres(genres: string[]) {
    const genresToAdd = [];

    for (const genre of genres) {
      const doesGenreExist = await this.doesGenreExist(genre);
      if (!doesGenreExist) {
        genresToAdd.push(genre);
      }
    }

    if (genresToAdd.length) {
      await dbConnection.query(insertGenres(genresToAdd));
    }
    return "Genres add to DB successfully";
  }

  async getLastInsertedGenre() {
    const [genreResult] = await dbConnection.query<GenreDBResponse[]>(
      lastInsertedGenreQuery()
    );

    return genreResult.at(0);
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

  async doesGenreExist(genreName: string): Promise<boolean> {
    try {
      const [result] = await dbConnection.query<GenreExistDBResponse[]>(
        doesGenreExist(genreName)
      );

      return Boolean(result[0].value_exists);
    } catch {
      return false;
    }
  }
}
