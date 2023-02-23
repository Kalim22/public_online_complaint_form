const profile = require("../modals/Profile");

const Profile = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ msg: "Please Provide your name!" });
  }
  try {
    const data = await new profile({
      name: name.toUpperCase().trim(),
      photo: req.file.filename,
    });
    await data.save();
    return res.status(201).send({ profile: data });
  } catch (error) {
    console.warn("error is -> ", error);
  }
};

const fs = require("fs");

const getPhoto = async (req, res) => {
  try {
    const data = await profile.find({});
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Profile,
  getPhoto,
};
