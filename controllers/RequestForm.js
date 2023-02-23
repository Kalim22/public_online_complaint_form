const requestForm = require("../modals/RequestFormSchema");
const fs = require("fs");

const addRequest = async (req, res) => {
  const {
    userName,
    userMobileNumber,
    voterIdNumber,
    area,
    mlaName,
    complaintAbout,
    description,
  } = req.body;

  if (
    !(
      userName &&
      userMobileNumber &&
      voterIdNumber &&
      area &&
      mlaName &&
      complaintAbout &&
      description
    )
  ) {
    return res.status(400).json({ err: "Please fill all the fields!" });
  }

  if (req.file === undefined) {
    return res.status(400).json({ msg: "please select a file" });
  }

  try {
    const addRequest = await new requestForm({
      userName: (
        userName.charAt(0).toUpperCase() +
        userName.substring(1, userName.length).toLowerCase()
      ).trim(),
      userMobileNumber,
      voterIdNumber: voterIdNumber.toUpperCase().trim(),
      area:
        area.charAt(0).toUpperCase().trim() +
        area.substring(1, area.length).toLowerCase().trim(),
      mlaName: mlaName.trim(),
      complaintAbout:
        complaintAbout.charAt(0).toUpperCase().trim() +
        complaintAbout.substring(1, complaintAbout.length).toLowerCase().trim(),
      description: description.trim(),
      photo: req.file.filename,
    });

    await addRequest.save();

    return res.status(201).json({
      msg: "Your request has been added successfully..",
      status: "success",
    });
  } catch (error) {
    console.log("Error is -> ", error);
  }
};

const getRequests = async (req, res) => {
  let place = req.params.place;
  place =
    place.charAt(0).toUpperCase().trim() +
    place.substring(1, place.length).toLowerCase().trim();
  try {
    const requests = await requestForm
      .find({ area: place })
      .select([
        "_id",
        "userName",
        "complaintAbout",
        "userMobileNumber",
        "createdAt",
      ]);
    return res.status(200).json({ requests: requests });
  } catch (error) {
    console.log("Error is -> ", error);
  }
};

const requestDetails = async (req, res) => {
  const id = req.params._id;
  try {
    const details = await requestForm.find({ _id: id });
    return res.status(200).json({ details: details });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addRequest,
  getRequests,
  requestDetails,
};
