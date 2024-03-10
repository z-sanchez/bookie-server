export type BookInput = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  quantityAvailable: number;
  imageURL: string;
};

export type AddBooksInput = {
  books: BookInput[];
};
