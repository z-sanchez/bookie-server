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
    imageURL: String!
  }

  type SearchBooks {
    books: [Book],
    moreResults: Boolean
  }

  input BookInput {
    title: String!,
    author: String!,
    description: String!,
    price: Float!,
    quantityAvailable: Int!,
    imageURL: String!,
    genres: [String],
  }

  input BookGenreInput {
    bookId: ID!,
    genreId: ID!
  }

  input GenreInput {
    genreId: ID!,
    genreName: String!
  }

  input SearchBooksInput {
    term: String!,
    limit: Int,
    startingIndex: Int
  }

  type Mutation {
    addBooks(books: [BookInput]): String,
    addGenres(genres: [GenreInput]): String,
    addGenreToBook(data: [BookGenreInput]): String,
  }

  type Query {
    getBooks: [Book],
    getGenres: [Genre]
    searchBooks(data: SearchBooksInput): SearchBooks,
    exportBooksToJSON: Boolean,

  }

  type Book {
    getGenres: [Genre]
  }
`;
