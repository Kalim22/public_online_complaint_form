const mongoose = require("mongoose");

const RequestFormSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userMobileNumber: {
      type: Number,
      required: true,
    },
    voterIdNumber: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    // mlaName: {
    //   type: String,
    //   required: true,
    // },
    complaintAbout: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("requestForms", RequestFormSchema);
