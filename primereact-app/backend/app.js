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
  const corsWhitelist = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }
  /*  res.setHeader(
    "Access-Control-Allow-Origin",
    *
  ); */
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

//Login
app.use("/signin", require("./middleware/login"));

//sportShirt
app.use("/sportshirt", require("./middleware/sportshirt"));

//purchase
app.use("/purchase", require("./middleware/purchaseshirt"));

module.exports = app;
