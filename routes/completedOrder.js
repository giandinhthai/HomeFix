const express = require("express");
const completed_order_router = express.Router();
const completed_order_controller = require("../controllers/completed_order");
const path = require("path");

completed_order_router.get(
  "/",
  completed_order_controller.getCompletedOrderByCustomerId
);
completed_order_router.get(
  "/detail",
  completed_order_controller.getCompletedOrderByOrderId
);
completed_order_router.get("/pic", completed_order_controller.getPicByOrderId);
completed_order_router.get(
  "/priceList",
  completed_order_controller.getPriceListByOrderId
);
completed_order_router.post(
  "/addRate",
  completed_order_controller.addRateByOrderId
);
completed_order_router.post(
  "/changeRate",
  completed_order_controller.changeRateByOrderId
);
completed_order_router.post(
  "/getRate",
  completed_order_controller.getRateByOrderId
);
completed_order_router.post(
  "/delRate",
  completed_order_controller.delRateByOrderId
);
completed_order_router.post("/complete", completed_order_controller.complete);
completed_order_router.post("/paid", completed_order_controller.paidByOrderId);
module.exports = completed_order_router;
