const router = require("express").Router();
const cartsController = require("../controllers/carts.controller.js");
const verfiyToken = require("../middlewares/verifyToken.js");

router.route("/").get(verfiyToken, cartsController.getAllCarts);
router.route("/").post(verfiyToken, cartsController.addCart);
router.route("/find/:id").get(cartsController.getSingleCart);
router.route("/update/:id").patch(verfiyToken, cartsController.updateCart);
router.route("/delete/:id").delete(verfiyToken, cartsController.deleteCart);

module.exports = router;
