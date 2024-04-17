import { Book } from "../../types/Book.js";
import {
  AddBooksInput,
  BookGenreInput,
  SearchBooksInput,
} from "../../types/graphql/BookInput.js";
import { BookModel } from "../models/BookModel.js";

const Book = new BookModel();

export const bookResovler = {
  Query: {
    getBooks: () => {
      return Book.getBooks();
    },
    searchBooks: (_, input: { data: SearchBooksInput }) => {
      return Book.searchBooks(input.data);
    },
    exportBooksToJSON: () => {
      return Book.exportBooksToJSON();
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
};
