import dotenv from "dotenv";
// ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
dotenv.config();
import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema.ts";
import { bookResovler } from "./graphql/resolvers/bookResolver.ts";
import { genreResolver } from "./graphql/resolvers/genreResolver.ts";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: [bookResovler, genreResolver],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 400 },
});

console.log(`🚀 Server ready at: ${url}`);
