const express = require("express");

const route = express.Router();

const {
  userLogin,
  userRegisteration,
  mlaLogin,
  mlaRegistration,
  addItem,
  mlaDetails
} = require("../controllers/Authentication");

route.post("/user-registration", userRegisteration);
route.post("/user-login", userLogin);
route.post("/mla-registration", mlaRegistration);
route.post("/mla-login", mlaLogin);
route.get('/allmlas', mlaDetails)

module.exports = route;
