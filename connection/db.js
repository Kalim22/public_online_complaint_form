const mongoose = require("mongoose");

// require("dotenv").config({
//   path: "./env/.env",
// });

mongoose.connect("mongodb://127.0.0.1:27017/", (err) => {
  if (err) {
    console.log("error is => ", err);
  }
  console.log("Database is connected...");
});
