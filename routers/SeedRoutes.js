const express = require("express");
const seedRouter = express.Router();
const Product = require("../models/productModel");
const User = require("../models/userModel");
const data = require("../Data");

seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  //   console.log(createdProducts);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});
module.exports = seedRouter;
