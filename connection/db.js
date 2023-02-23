const mongoose = require("mongoose");

require("dotenv").config({
  path: "./env/.env",
});

mongoose.connect(process.env.MONGODBURI, (err) => {
  if (err) {
    console.log("error is => ", err);
  }
  console.log("Database is connected...");
});
