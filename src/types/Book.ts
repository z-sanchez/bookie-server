export type Book = {
  id: string;
  author: string;
  title: string;
  description: string;
  price: number;
  quantityAvailable: number;
  imageURL: string;
};

export type SearchBooks = {
  books: Book[];
  moreResults: boolean;
};
