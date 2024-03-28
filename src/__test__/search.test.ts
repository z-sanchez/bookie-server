import { searchHasMoreResults } from "../helpers/books.js";

describe("Search Detail Functions", () => {
  test("Initial Test", () => {
    const totalResultCount = 50;
    const resultCount = 10;
    const startingIndex = 0;

    const hasMoreResults = searchHasMoreResults({
      resultCount,
      startingIndex,
      totalResultCount,
    });

    expect(hasMoreResults).toBeTruthy();
  });
});
