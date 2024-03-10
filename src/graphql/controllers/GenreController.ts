import { GenreInput } from "../../types/graphql/GenreInput.js";

export class GenreController {
  addGenres(genres: GenreInput[]) {
    console.log({ genres });
    return "Genre add to DB successfully";
  }
}
