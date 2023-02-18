const express = require("express");
const jwt = require("jsonwebtoken");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");

const { UserModel } = require("../models/User.model");

UserRouter.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});

UserRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  const saltRounds = 5;
  try {
    bcrypt.hash(pass, saltRounds, async (error, hash) => {
      if (error) {
        res.send({ msg: "Something went wrong", error: error.message });
      } else {
        const userDetail = new UserModel({ name, email, pass: hash });
        await userDetail.save();
        console.log(userDetail);
        res.send({ msg: "New User registered successfully" });
      }
    });
  } catch (err) {
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "masai");
          //   console.log(token);
          res.send({
            msg: "User successfully logged in",
            token: token,
            email: email,
          });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Not able to login!Wrong credentials");
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

// UserRouter.get("/about", authenticate, (req, res) => {
//   const token = req.headers.authorization;

//   jwt.verify(token, "masai", (err, decoded) => {
//     if (decoded) {
//       res.send({ msg: "Data is here...!" });
//     } else {
//       res.send({ msg: err.message, message: "Something went wrong" });
//     }
//   });
// });

UserRouter.delete("/delete/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    await UserModel.findByIdAndDelete({ _id: userID });
    res.send({ msg: "User deleted successfully" });
  } catch (err) {
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

module.exports = { UserRouter };
