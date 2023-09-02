import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import config from "./config";

const mongoConnect = async () => {
  const mongo = await mongoose.connect(config.MONGO_URI);
  console.log(`MongoDB connected: ${mongo.connection.host}`);
};

mongoConnect();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Student Hub Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
