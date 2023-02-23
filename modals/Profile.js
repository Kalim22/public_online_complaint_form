const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const Profile = Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

module.exports = model("profile", Profile);
