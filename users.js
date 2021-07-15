const express = require("express");
const router = express.Router();
const cors = require("cors");
const questions = require("./questions.json");
const nicknames = require("./nicknames.json");

const User = require("./model/Users");
const { response } = require("express");

router.post("/user", (req, res) => {
  const newUser = new User({
    name: req.body.name,
  });
  newUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/nicknames", (req, res) => {
  console.log(typeof nicknames);
  res.json(nicknames);
});

router.get("/questions", (req, res) => {
  res.json(questions);
});

module.exports = router;
