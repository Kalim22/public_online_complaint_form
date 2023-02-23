const express = require("express");

const route = express.Router();

const {
  userLogin,
  userRegisteration,
  mlaLogin,
  mlaRegistration,
} = require("../controllers/Authentication");

route.post("/user-registration", userRegisteration);
route.post("/user-login", userLogin);
route.post("/mla-registration", mlaRegistration);
route.post("/mla-login", mlaLogin);

module.exports = route;
