export const searchHasMoreResults = ({
  limitedResultCount,
  totalResultCount,
  offset,
}: {
  limitedResultCount: number;
  totalResultCount: number;
  offset?: number;
}) => {
  const offsetCount = offset === 0 || !offset ? 0 : offset;
  return totalResultCount > limitedResultCount + offsetCount;
};
