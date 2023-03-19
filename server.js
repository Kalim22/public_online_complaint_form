const express = require("express");
const cors = require("cors");

require("./connection/db");

require("dotenv").config({
  path: "./env/.env",
});

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/", require("./routes/RequestForm"));

app.use("/", require("./routes/Authentication"));

app.use("/", require("./routes/Profile"));

app.get("/", (req, res) => {
  res.send("Everything is working");
});

app.listen("8000", (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running...`);
});
