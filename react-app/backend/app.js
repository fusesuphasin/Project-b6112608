require("dotenv").config();
require("./config/database").connect();

// importing user context
const User = require("./model/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );

  return next();
});

app.use(express.json());
// Logic goes here

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.get("/", (req, res) => {
  console.log("Wellcome");
});

//Register
app.use("/signup", require("./middleware/register"));
app.use("/signin", require("./middleware/login"));

module.exports = app;
