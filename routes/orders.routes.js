const router = require("express").Router();
const orderController = require("../controllers/orders.controller.js");

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.addOrder);

router
  .route("/:id")
  .get(orderController.getSingleOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
