const mongoose = require("mongoose");

// require("dotenv").config({
//   path: "./env/.env",
// });

mongoose.connect("mongodb:/0.0.0.0:27017/", (err) => {
  if (err) {
    console.log("error is => ", err);
  }
  console.log("Database is connected...");
});
