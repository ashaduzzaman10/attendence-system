require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const authenticate = require("./middleware/authenticate");

const app = express();

app.use(express.json(), express.urlencoded({ extended: true }), [
  (cors(), morgan("dev"), routes),
]);

app.get("/private", authenticate, (req, res) => {
  console.log("user : ", req.user);
  return res.status(200).json({ message: "I am a private route" });
});

app.get("/public", (req, res) => {
  return res.status(200).json({ message: "I am a public route" });
});

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "success" });
});

app.use((err, _req, res, _next) => {
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
