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
  
  const { name, mlaId, area, partyName, password } = req.body;

  if (!(name && mlaId && area && partyName && password)) {
    return res
      .status(400)
      .json({ errmsg: "Please fill all the fields!", status: "failed" });
  }

  try {

    const existingMla = await mla.findOne({ mlaId: mlaId });

    if (existingMla) {
      return res
      .status(400)
      .json({ errMsg: "Mla already exists!", status: "failed" });
    }

    const addMla = new mla({
      name,
      mlaId,
      area,
      partyName,
      password,
    });

    await addMla.save();

    return res.status(201).json({
      status: "success",
    });
    
  } catch (error) {
    console.log("err is - >", error);
  }
};

const mlaLogin = async (req, res) => {
  const { mlaId, password } = req.body;

  try {
    const existingMla = await mla.findOne({
      mlaId
    });

    console.log(existingMla)

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

const mlaDetails = async (req, res) => {
  try {
    const allMlas = await mla.find({})
    return res.status(200).json({allMlas})
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  userRegisteration,
  mlaRegistration,
  userLogin,
  mlaLogin,
  mlaDetails
};
