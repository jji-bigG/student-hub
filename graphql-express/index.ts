import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import config from "./config";
import { ApolloServer, ExpressContext, gql } from "apollo-server-express";
import cors from "cors";

import authRouter from "./routes/user";

const app: Express = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];
app.use(cors({ origin: allowedOrigins }));

app.use("/user", authRouter);

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

let apollo: ApolloServer<ExpressContext> | any = null;
async function startServer() {
  apollo = new ApolloServer({ typeDefs, resolvers });
  await apollo.start();
  apollo.applyMiddleware({ app });
}
startServer();

const mongoConnect = async () => {
  const mongo = await mongoose.connect(config.MONGO_URI);
  console.log(`MongoDB connected: ${mongo.connection.host}`);
};

mongoConnect();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Student Hub Server");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`Graphql Path: ${apollo.graphqlPath}`);
});
