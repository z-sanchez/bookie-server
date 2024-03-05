import { RowDataPacket } from "mysql2";
import { Product } from "../../types/Product.js";
import { dbConnection } from "../db.js";

export const getBooks = async () => {
  try {
    const [results, fields] = await dbConnection.query<RowDataPacket[]>(
      "SELECT * FROM BOOKS"
    );

    const mappedResults: Product[] = results.map((result) => {
      return {
        id: result.ID,
        author: result.Author,
        title: result.Title,
        description: result.Description,
        price: result.Price,
        quantityAvailable: result.QuantityAvailable,
        genres: [],
        imageURL: "",
      };
    });

    return mappedResults;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
