const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const data = require("./Data");
const path = require("path");
const seedRouter = require("./routers/SeedRoutes");
const productRouter = require("./routers/ProductRouter");
const mongo = require("./Connect");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
// );

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

mongo.connect();
app.use("/", (req, res) => {
  res.send("amazone__clone project");
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
