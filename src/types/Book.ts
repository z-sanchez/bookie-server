import { Genre } from "./Genre.js";

export type Book = {
  id: string;
  author: string;
  title: string;
  description: string;
  price: number;
  quantityAvailable: number;
  genres: Genre[];
  imageURL: string;
};
