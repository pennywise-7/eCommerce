const router = require("express").Router();
const cartController = require("../controllers/carts.controller.js");

router.route("/").get(cartController.getAllCarts).post(cartController.addCart);

router
  .route("/:id")
  .get(cartController.getSingleCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

module.exports = router;
