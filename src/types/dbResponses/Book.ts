import { RowDataPacket } from "mysql2";

export interface BookDBResponse extends RowDataPacket {
  BookID: string;
  Author: string;
  Title: string;
  Descrption: string;
  Price: number;
  QuantityAvailable: number;
  ImageUrl: string;
}
