const router = require("express").Router();
const productController = require("../controllers/products.controller.js");
const verfiyToken = require("../middlewares/verifyToken.js");

router.route("/").get(verfiyToken, productController.getAllProducts);
router.route("/").post(verfiyToken, productController.addProduct);
router.route("/find/:id").get(productController.getSingleProduct);
router.route("/update/:id").patch(verfiyToken, productController.updateProduct);
router
  .route("/delete/:id")
  .delete(verfiyToken, productController.deleteProduct);

module.exports = router;
