import { insertGenres } from "../../queries/genres.js";
import { GenreInput } from "../../types/graphql/GenreInput.js";
import { dbConnection } from "../../connectors/db.js";

export class GenreController {
  async addGenres(genres: GenreInput[]) {
    await dbConnection.query(insertGenres(genres));
    return "Genres add to DB successfully";
  }
}
