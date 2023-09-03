import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import config from "./config";
import { ApolloServer, ExpressContext, gql } from "apollo-server-express";
import cors from "cors";

import authRouter from "./routes/user";
import session from "express-session";
import passport from "passport";
import UserModel from "./models/User.model";

const app: Express = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];
app.use(cors({ origin: allowedOrigins }));

// passport authentication
// must enable sessions support to have passport (uses secure cookies)
app.use(
  session({
    secret: "EUgQdKKhyUCL7aClIz4E",
    resave: false,
    saveUninitialized: false,

    cookie: { maxAge: 48 * 60 * 60 * 1000 }, // setting length of time w/ x hr * 60 mins * 60 s * 1000 ms
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(UserModel.createStrategy());

// to use passport with session
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// adopting different routers below
app.use("/user", authRouter);

// pass in graphql params & configs below
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
