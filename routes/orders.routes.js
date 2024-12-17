const router = require("express").Router();
const ordersController = require("../controllers/orders.controller.js");
const verfiyToken = require("../middlewares/verifyToken.js");

router.route("/").get(verfiyToken, ordersController.getAllOrders);
router.route("/").post(verfiyToken, ordersController.addOrder);
router.route("/find/:id").get(ordersController.getUserOrders);
router.route("/update/:id").patch(verfiyToken, ordersController.updateOrder);
router.route("/delete/:id").delete(verfiyToken, ordersController.deleteOrder);

module.exports = router;
