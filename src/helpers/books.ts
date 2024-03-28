export const searchHasMoreResults = ({
  resultCount,
  totalResultCount,
  startingIndex,
}: {
  resultCount: number;
  totalResultCount: number;
  startingIndex?: number;
}) => {
  const offsetCount = startingIndex === 0 || !startingIndex ? 0 : startingIndex;
  return totalResultCount > resultCount + offsetCount;
};
