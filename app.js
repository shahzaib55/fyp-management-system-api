const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// const morgan = require('morgan');

// //bring in routes
const postRoutes = require("./routes/post");
const { json } = require("body-parser");

// //middleware
// app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", postRoutes);
app.use(express.json());

module.exports = app;
