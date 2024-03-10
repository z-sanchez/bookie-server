export type GenreInput = {
  genredId: string;
  genreName: string;
};

export type AddGenresInput = {
  genres: GenreInput[];
};
