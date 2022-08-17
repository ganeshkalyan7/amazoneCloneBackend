const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const expressAsyncHandler = require("express-async-handler");
// const { generateToken } = require("../utils");

userRouter.post("/signin", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(existUser);
    //email validation
    if (!user) {
      res.status(500).json({ msg: "email doesnst exist!!!!! please register" });
    }
    //password validation
    const isValid = await bcrypt.compare(req.body.password, user.password);
    // console.log("hello");
    if (!isValid) {
      res.status(404).json({ msg: "password invalid" });
    }
    //if email and password corect than generate password
    var token = jwt.sign({ user }, "SECRET_key", {
      expiresIn: "30d",
    });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});

//signup functionality
userRouter.post("/signup", async (req, res, next) => {
  try {
    //userexists or not
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(404).json({ msg: "user already exist!!!" });
    }
    //encrypt of password
    hashedpassword = bcrypt.hashSync(req.body.password);

    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
    });
    var response = await newuser.save();
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRouter;

//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       if (bcrypt.compareSync(req.body.password, user.password)) {
//         res.send({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           token: generateToken(user),
//         });
//         return;
//       }
//     }
//     res.status(401).send({ message: "Invalid email or password" });
//   })
