import { AddBooksInput } from "../../types/graphql/BookInput.js";
import { BookModel } from "../models/BookModel.js";

const Book = new BookModel();

export const bookResovler = {
  Query: {
    getBooks: () => {
      return Book.getBooks();
    },
  },
  Mutation: {
    addBooks: (_, input: AddBooksInput) => {
      return Book.storeBooks(input.books);
    },
  },
};
