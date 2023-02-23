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

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on http://localhost:${port}`);
});
