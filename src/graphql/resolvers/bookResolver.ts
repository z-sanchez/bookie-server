import { Book } from "../../types/Book.ts";
import {
  AddBooksInput,
  BookGenreInput,
  SearchBooksInput,
} from "../../types/graphql/BookInput.ts";
import { BookModel } from "../models/BookModel.ts";

const Book = new BookModel();

export const bookResovler = {
  Query: {
    getBooks: () => {
      return Book.getBooks();
    },
    searchBooks: (_, input: { data: SearchBooksInput }) => {
      return Book.searchBooks(input.data);
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
