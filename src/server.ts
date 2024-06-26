import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema.js";
import { bookResovler } from "./graphql/resolvers/bookResolver.js";
import { genreResolver } from "./graphql/resolvers/genreResolver.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: [bookResovler, genreResolver],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀 Server ready at: ${url}`);
