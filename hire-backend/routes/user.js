const express = require("express");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");

const WrapAsync = require("../utils/WrapAsync.js");
const { RegisterUser, LoginUser } = require("../controllers/UserController.js");

UserRouter.post("/createAccount", WrapAsync(RegisterUser));
UserRouter.post("/login", WrapAsync(LoginUser));
module.exports = UserRouter;
