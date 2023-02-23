const express = require("express");

const {
  addRequest,
  getRequests,
  requestDetails,
} = require("../controllers/RequestForm");

const upload = require("../middlewares/upload");

const route = express.Router();

route.post("/add-request", upload.single("photo"), addRequest);
route.get("/get-request/:place", getRequests);
route.get("/request-details/:_id", requestDetails);

// route.post("/upload-data", upload, require("../controllers/upload"));

module.exports = route;
