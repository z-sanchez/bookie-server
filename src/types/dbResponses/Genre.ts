import { RowDataPacket } from "mysql2";

export interface GenreDBResponse extends RowDataPacket {
  GenreName: string;
  GenreID: string;
}

export interface GenreExistDBResponse extends RowDataPacket {
  value_exists: boolean;
}
