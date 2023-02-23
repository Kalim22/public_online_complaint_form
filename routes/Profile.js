const express = require("express");

const route = express.Router();

const { Profile, getPhoto } = require("../controllers/Profile");

require("dotenv").config({ path: "../env/.env" });

const multer = require("multer");

const { GridFsStorage } = require("multer-gridfs-storage");

const url = process.env.MONGODBURI;

const dbName = "test";

// let storage = new GridFsStorage({
//   url: `${url}/${dbName}`,
//   file: (req, file) => {
//     return {
//       bucketName: "test",
//       filename: file.originalname,
//     };
//   },
// });

// let upload = null;

// storage.on("connection", (db) => {
//   upload = multer({
//     storage: storage,
//   }).single("profile");
// });

const storage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.filename + "-" + Date.now().toString() + ".jpg");
    },
  }),
}).single("photo");

route.post("/profile", storage, Profile);
route.get("/getprofile", getPhoto);

module.exports = route;
