const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const db = require("./key").MongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", require("./users"));

const PORT = process.env.PORT || 7000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("nicknames/build"));
}

app.listen(PORT, console.log(`Server started on port ${7000}`));
