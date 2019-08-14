const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./Routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, POST, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://farrah:riseup@riseup-7atlt.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(result => {
    console.log("Database connected!");
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
