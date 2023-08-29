import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs as User, resolvers as userResolver } from "./types/user.js";
import { typeDefs as Dorm, resolvers as dormResolvers } from "./types/dorm.js";

import { MongoClient } from "mongodb";

import DSMongoDB from "./datasources/DSMongoDB.js";

const mongoClient = new MongoClient("mongodb://localhost:27017/test");
mongoClient.connect();

const Base = `#graphql
type Query {
  _empty: String
}

# type Mutation {}

# type Subscribe {}
`;

interface ContextValues {
  dataSources: {
    mongo: DSMongoDB;
  };
}

const server = new ApolloServer<ContextValues>({
  typeDefs: [Base, User, Dorm],
  resolvers: { ...userResolver, ...dormResolvers },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const mongo = new DSMongoDB();

    return {
      dataSources: {
        mongo,
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
