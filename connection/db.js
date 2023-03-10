const mongoose = require("mongoose");

// require("dotenv").config({
//   path: "./env/.env",
// });

let mongodburi = "mongodb+srv://studboy71:OctZ0aYdIEJRJXDl@cluster0.ems4s3o.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongodburi, (err) => {
  if (err) {
    console.log("error is => ", err);
  }
  console.log("Database is connected...");
});
