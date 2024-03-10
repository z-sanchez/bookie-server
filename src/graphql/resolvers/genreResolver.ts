import { AddGenresInput } from "../../types/graphql/GenreInput.js";
import { GenreController } from "../controllers/GenreController.js";

const Genre = new GenreController();

export const genreResolver = {
  Mutation: {
    addGenres: (_, input: AddGenresInput) => {
      return Genre.addGenres(input.genres);
    },
  },
};
