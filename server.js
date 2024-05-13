const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("./models/User");

const app = express();
express.urlencoded({ extended: true });
app.use(express.json(), express.urlencoded({ extended: true }), [
  (cors(), morgan("dev")),
]);

app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "invalid data",
    });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist",
      });
    }
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();
    return res.status(201).json({
      message: "user created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "invalid credential",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "invalid credential",
      });
    }
    delete user._doc.password;
    const token = jwt.sign(user._doc, "process.env.JWT_SECRET",{expiresIn : "2hr"});

    return res.status(200).json({
      message: "login successfully done",
      token
    });
  } catch (err) {
    next(err);
  }
});

app.get("/private", async (req, res) => {
  return res.status(200).json({ message: "I am a private route" });
});

app.get("/public", (req, res) => {
  return res.status(200).json({ message: "I am a public route" });
});

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "success" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({
    message,
  });
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database Connected");
    app.listen(4000, () => {
      console.log("I am listening on port 4000");
    });
  })
  .catch((err) => console.log(err));
