export type GenreInput = {
  genreId: string;
  genreName: string;
};

export type AddGenresInput = {
  genres: GenreInput[];
};
