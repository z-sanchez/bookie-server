export type BookInput = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  quantityAvailable: number;
  imageURL: string;
  genres?: string[];
};

export type AddBooksInput = {
  books: BookInput[];
};

export type BookGenreInput = {
  bookId: string;
  genreId: string;
};

export type SearchBooksInput = {
  term: string;
  limit?: number;
  startingIndex?: number;
};
