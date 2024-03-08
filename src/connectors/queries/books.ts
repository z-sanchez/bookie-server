import { Product } from "../../types/Product.js";
import { dbConnection } from "../db.js";
import { BookDBResponse, GenreDBResponse } from "../../types/Book.js";

export const getBooks = async () => {
  try {
    const [results] = await dbConnection.query<BookDBResponse[]>(
      "SELECT * FROM BOOKS"
    );

    const mappedResults: Product[] = await Promise.all(
      results.map(async (result) => {
        const [genreResults] = await dbConnection.query<GenreDBResponse[]>(
          `SELECT Genres.GenreName from BookGenres JOIN Genres
        on BookGenres.GenreID = Genres.GenreID
        WHERE BookGenres.BookID = ${result.BookID}`
        );

        return {
          id: result.BookID,
          author: result.Author,
          title: result.Title,
          description: result.Description,
          price: result.Price,
          quantityAvailable: result.QuantityAvailable,
          imageURL: result.ImageUrl,
          genres: [...genreResults.map((genre) => genre.GenreName)],
        };
      })
    );

    return mappedResults;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
