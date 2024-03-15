import {
  AddBooksInput,
  BookGenreInput,
} from "../../types/graphql/BookInput.js";
import { BookModel } from "../models/BookModel.js";

const Book = new BookModel();

export const bookResovler = {
  Query: {
    getBooks: (parent, args, context, info) => {
      console.log({
        info: info.fieldNodes[0].selectionSet.selections.some(
          ({ name }) => name.value === "genres"
        ),
      });
      return Book.getBooks();
    },
  },
  Mutation: {
    addBooks: (_, input: AddBooksInput) => {
      return Book.storeBooks(input.books);
    },
    addGenreToBook: (_, input: { data: BookGenreInput[] }) => {
      return Book.addGenreToBook(input.data);
    },
  },
  Book: {
    getGenres: (input) => {
      console.log({ input });
      return input.genres;
    },
  },
};
