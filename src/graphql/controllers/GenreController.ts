import { getAllGenres, insertGenres } from "../../queries/genres.js";
import { GenreInput } from "../../types/graphql/GenreInput.js";
import { dbConnection } from "../../connectors/db.js";
import { GenreDBResponse } from "../../types/dbResponses/Genre.js";
import { Genre } from "../../types/Genre.js";

export class GenreController {
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
}
