import { dbConnection } from "../connectors/db.js";

export const getBooks = async () => {
  try {
    const [results, fields] = await dbConnection.query("SELECT * FROM BOOKS");

    console.log(results);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
