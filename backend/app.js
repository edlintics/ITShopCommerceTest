const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewears/errors");

// us ethe corresponding techonology that associated witd (cookier Pasing from client side and json data)
app.use(express.json());
app.use(cookieParser());

// import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);

// Middleware to handle error
app.use(errorMiddleware);

module.exports = app;
