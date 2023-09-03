import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import config from "./config";
import { ApolloServer, gql } from "apollo-server-express";

const app: Express = express();
const port = process.env.PORT;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world",
  },
  //   Mutation: {},
};

const apollo = new ApolloServer({ typeDefs, resolvers });
apollo.applyMiddleware({ app });

const mongoConnect = async () => {
  const mongo = await mongoose.connect(config.MONGO_URI);
  console.log(`MongoDB connected: ${mongo.connection.host}`);
};

mongoConnect();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Student Hub Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
