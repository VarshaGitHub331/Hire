const express = require("express");
const OrderRouter = express.Router();

const WrapAsync = require("../utils/WrapAsync");
const { AuthUser } = require("../controllers/UserController");
const {
  acceptOrder,
  completeOrder,
  bidUpdate,
} = require("../controllers/OrderController");
const Order = require("../models/Order");

OrderRouter.post("/acceptOrder", WrapAsync(acceptOrder));
OrderRouter.post("/completeOrder", WrapAsync(completeOrder));
OrderRouter.patch("/updateBid", WrapAsync(bidUpdate));
module.exports = OrderRouter;
