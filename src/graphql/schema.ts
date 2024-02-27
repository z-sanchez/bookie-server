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

  type Query {
    books: [Book]
  }
`;
