import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

import express from "express";
const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware handling cors policy
app.use(cors());

//route for the default homepage
app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to the express server!");
});

app.use("/books", bookRoute);

//connncting to a mongoose
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("database is setup");
    app.listen(PORT, () => {
      console.log("listening on port");
    });
  })
  .catch((error) => {
    console.log(error);
  });
