import { BookController } from "../controllers/BookController.js";

const Books = new BookController();

export const bookResovler = {
  Query: {
    books: () => {
      return Books.getBooks();
    },
  },
};
