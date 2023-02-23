const mongoose = require("mongoose");

const mlaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  governmentid: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("mla", mlaSchema);
