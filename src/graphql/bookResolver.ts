import { getBooks } from "../connectors/queries/books.js";

export const bookResovler = {
  Query: {
    books: () => {
      return getBooks();
    },
  },
};
