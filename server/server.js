require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose
  .connect(process.env.database)
  .then(() => console.log("Connected to MongoDB 🔥"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("server is running 🔥");
});

//express application using required packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

const userRoutes = require("./routes/account.js");
const mainRoutes = require("./routes/main.js");
const sellerRoutes = require("./routes/seller.js");
const productSearchRoutes = require("./routes/product-search.js");

// //express application using Routes from this application
app.use("/api", mainRoutes);
app.use("/api/accounts", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/search", productSearchRoutes);

app.listen(process.env.port, (err) => {
  console.log("Server connected at port: " + process.env.port);
});
