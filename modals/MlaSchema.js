const mongoose = require("mongoose");

const mlaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mlaId: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  partyName: {
    type: String,
    required: [true, 'party name must be required'],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("mla", mlaSchema);
