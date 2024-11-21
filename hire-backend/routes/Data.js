const express = require("express");
const WrapAsync = require("../utils/WrapAsync");
const dataRouter = express.Router();
const {
  FetchCategories,
  FetchSkills,
} = require("../controllers/DataController");
dataRouter.get("/getCategories", WrapAsync(FetchCategories));
dataRouter.get("/fetchSkills", WrapAsync(FetchSkills));
module.exports = dataRouter;
