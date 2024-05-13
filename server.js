require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const authenticate = require("./middleware/authenticate");
const routes = require("./routes");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use([morgan("dev"), cors()]);
app.use(express.json());
app.use(routes);

app.get("/private", authenticate, async (req, res) => {
  return res.status(200).json({ message: "I am a private route" });
});

app.get("/public", authenticate, (req, res) => {
  return res.status(200).json({ message: "I am a public route" });
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
  .catch((e) => console.log(e));
