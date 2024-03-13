export const typeDefs = `
  #graphql

  type Genre {
    genreId: ID!,
    genreName: String!
  }

  type Book {
    id: ID!,
    title: String!,
    author: String!,
    description: String!,
    price: Float!,
    quantityAvailable: Int!,
    genres: [Genre]!,
    imageURL: String!
  }

  input BookInput {
    id: ID!,
    title: String!,
    author: String!,
    description: String!,
    price: Float!,
    quantityAvailable: Int!,
    imageURL: String!
  }

  input BookGenreInput {
    bookId: ID!,
    genreId: ID!
  }

  input GenreInput {
    genreId: ID!,
    genreName: String!
  }

  type Mutation {
    addBooks(books: [BookInput]): String,
    addGenres(genres: [GenreInput]): String,
    addGenreToBook(data: [BookGenreInput]): String,
  }

  type Query {
    getBooks: [Book],
    getGenres: [Genre]
  }
`;
