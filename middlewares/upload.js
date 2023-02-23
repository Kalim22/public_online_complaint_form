const multer = require("multer");

const Storage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.filename + "-" + Date.now().toString() + ".jpg");
    },
  }),
});

module.exports = Storage;
