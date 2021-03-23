import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import routes from "./routes";

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.hnri0.mongodb.net/next-quiz?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(morgan("dev"));

app.listen(3333);
