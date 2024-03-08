import { RowDataPacket } from "mysql2";

export interface BookDBResponse extends RowDataPacket {
  BookID: number;
  Author: string;
  Title: string;
  Descrption: string;
  Price: number;
  QuantityAvailable: number;
  ImageUrl: string;
}

export interface GenreDBResponse extends RowDataPacket {
  GenreName: string;
}
