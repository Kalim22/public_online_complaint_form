const user = require("../modals/UserSchema");
const mla = require("../modals/MlaSchema");

const userRegisteration = async (req, res) => {
  const { name, email_phone, voterid, gender, password, confirmpassword } =
    req.body;

  if (
    !(name && email_phone && voterid && gender && password && confirmpassword)
  ) {
    return res
      .status(400)
      .json({ errmsg: "Please fill all the fields!", status: "failed" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({
      errMsg: "Password and confirm password can't be different",
      status: "failed",
    });
  }

  try {
    const existingUser = await user.findOne({ email_phone: email_phone });

    if (!existingUser) {
      const addUser = new user({
        name,
        email_phone,
        voterid,
        gender,
        password,
        confirmpassword,
      });
      await addUser.save();
      return res.status(201).json({
        status: "success",
      });
    }
    return res.status(404).json({
      err: "user already exists. Please Login with the same email / phone number...",
      status: "failed",
    });
  } catch (error) {
    console.log("err is - >", error);
  }
};

const userLogin = async (req, res) => {
  const { email_phone, password } = req.body;

  try {
    const existingUser = await user.findOne({ email_phone });
    if (existingUser) {
      if (existingUser.password === password) {
        return res.status(200).json({
          user: existingUser,
          status: "success",
          type: "user",
        });
      } else {
        return res.status(400).json({
          msg: "Password Mismatch....",
          status: "failed",
        });
      }
    }
    return res.status(404).json({
      msg: "user not found!...Please register before loging!",
      status: "failed",
    });
  } catch (error) {
    console.log("err is ->", error);
  }
};

const mlaRegistration = async (req, res) => {
  const { name, governmentid, area, password, confirmpassword } = req.body;

  if (!(name && governmentid && area && password && confirmpassword)) {
    return res
      .status(400)
      .json({ errmsg: "Please fill all the fields!", status: "failed" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({
      errMsg: "Password and confirm password can't be different",
      status: "failed",
    });
  }

  try {
    const existingMla = await mla.findOne({ governmentid: governmentid });

    if (!existingMla) {
      const addMla = new mla({
        name:
          name.trim().charAt(0).toUpperCase() +
          name.substring(1, name.length).toLowerCase().trim(),
        governmentid: governmentid.toLowerCase().trim(),
        area,
        password,
        confirmpassword,
      });
      await addMla.save();
      return res.status(201).json({
        status: "success",
      });
    }
    return res
      .status(400)
      .json({ errMsg: "Mla already exists!", status: "failed" });
  } catch (error) {
    console.log("err is - >", error);
  }
};

const mlaLogin = async (req, res) => {
  const { governmentid, password } = req.body;

  try {
    const existingMla = await mla.findOne({
      governmentid: governmentid.toLowerCase().trim(),
    });

    if (existingMla) {
      if (existingMla.password === password) {
        return res.status(200).json({
          mlaDetails: existingMla,
          type: "mla",
          status: "success",
        });
      } else {
        return res
          .status(400)
          .json({ errmsg: "Password Mismatch!", status: "failed" });
      }
    }
    return res.status(404).json({
      errMsg: "Mla not found!...Please Register before loging!",
      status: "failed",
    });
  } catch (error) {
    console.log("err is ->", error);
  }
};

module.exports = {
  userRegisteration,
  mlaRegistration,
  userLogin,
  mlaLogin,
};
