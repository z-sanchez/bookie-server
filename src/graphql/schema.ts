export const typeDefs = `
  #graphql
  type Book {
    id: ID!,
    title: String!,
    author: String!,
    description: String!,
    price: Float!,
    quantityAvailable: Int!,
    genres: [String]!,
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

  input GenreInput {
    genreId: ID!,
    genreName: String!
  }

  type Mutation {
    addBooks(books: [BookInput]): String,
    addGenres(genres: [GenreInput]): String
  }

  type Query {
    getBooks: [Book],
  }
`;
