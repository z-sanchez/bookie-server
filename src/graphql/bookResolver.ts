import products from "../products/products.json" with { type: "json" };

export const bookResovler = {
  Query: {
    books: () => products.books,
  },
};