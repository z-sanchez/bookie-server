import { searchHasMoreResults } from "../helpers/books.js";

describe("Search Detail Functions", () => {
  test("Has More Results with starting index of 0", () => {
    const totalResultCount = 50;
    const limitedResultCount = 10;
    const offset = 0;

    const hasMoreResults = searchHasMoreResults({
      limitedResultCount,
      offset,
      totalResultCount,
    });

    expect(hasMoreResults).toBeTruthy();
  });

  test("Offset exceeds result count", () => {
    const totalResultCount = 8;
    const limitedResultCount = 5;
    const offset = 15;

    const hasMoreResults = searchHasMoreResults({
      limitedResultCount,
      offset,
      totalResultCount,
    });

    expect(hasMoreResults).toBeFalsy();
  });

  test("Only one result after starting index", () => {
    const totalResultCount = 8;
    const limitedResultCount = 1;
    const offset = 6;

    const hasMoreResults = searchHasMoreResults({
      limitedResultCount,
      offset,
      totalResultCount,
    });

    expect(hasMoreResults).toBeTruthy();
  });

  test("No offset", () => {
    const totalResultCount = 8;
    const limitedResultCount = 5;
    const hasMoreResults = searchHasMoreResults({
      limitedResultCount,
      totalResultCount,
    });
    expect(hasMoreResults).toBeTruthy();
  });

  test("Offset is undefined", () => {
    const totalResultCount = 8;
    const limitedResultCount = 5;
    const offset = undefined;
    const hasMoreResults = searchHasMoreResults({
      limitedResultCount,
      offset,
      totalResultCount,
    });
    expect(hasMoreResults).toBeTruthy();
  });

  test("Limit is 0", () => {
    const totalResultCount = 15;
    const limitedResultCount = 0;
    const hasMoreResults = searchHasMoreResults({
      limitedResultCount,
      totalResultCount,
    });
    expect(hasMoreResults).toBeTruthy();
  });
});
