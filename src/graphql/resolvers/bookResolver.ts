import { AddBooksInput } from "../../types/graphql/BookInput.js";
import { BookController } from "../controllers/BookController.js";

const Books = new BookController();

export const bookResovler = {
  Query: {
    getBooks: () => {
      return Books.getBooks();
    },
  },
  Mutation: {
    addBooks: (_, input: AddBooksInput) => {
      return Books.storeBooks(input.books);
    },
  },
};
