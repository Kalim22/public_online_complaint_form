const express = require("express");
const cors = require("cors");

require("./connection/db");

require("dotenv").config({
  path: "./env/.env",
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/", require("./routes/RequestForm"));

app.use("/", require("./routes/Authentication"));

app.use("/", require("./routes/Profile"));

app.listen("8000", (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running...`);
});
