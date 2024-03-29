import { Book } from "../../types/Book.ts";
import { AddGenresInput } from "../../types/graphql/GenreInput.ts";
import { GenreModel } from "../models/GenreModel.ts";

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
