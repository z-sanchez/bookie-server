import { Book } from "../../types/Book.js";
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
  Book: {
    getGenres: (input: Book) => {
      return Genre.getBookGenres(input.id);
    },
  },
};
