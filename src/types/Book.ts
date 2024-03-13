export type Book = {
  id: string;
  author: string;
  title: string;
  description: string;
  price: number;
  quantityAvailable: number;
  genres: string[];
  imageURL: string;
};