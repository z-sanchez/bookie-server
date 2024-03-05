import products from "../products/products.json" with { type: "json" };
import { getBooks } from "./getBooks.js";

export const bookResovler = {
  Query: {
    books: () =>{
      getBooks();
      return products.books
    },
  },
};