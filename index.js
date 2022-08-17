const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
// const data = require("./Data");
const seedRouter = require("./routers/SeedRoutes");
const productRouter = require("./routers/ProductRouter");
const mongo = require("./Connect");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

mongo.connect();

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
