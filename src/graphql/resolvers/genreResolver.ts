import { AddGenresInput } from "../../types/graphql/GenreInput.js";
import { GenreModel } from "../models/GenreModel.js";

const Genre = new GenreModel();

export const genreResolver = {
  Query: {
    getGenres: () => {
      return Genre.getGenres();
    },
  },
  Mutation: {
    addGenres: (_, input: AddGenresInput) => {
      return Genre.addGenres(input.genres);
    },
  },
};
