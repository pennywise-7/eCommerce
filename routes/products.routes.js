const router = require("express").Router();
const productController = require("../controllers/products.controller.js");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addProduct);

router
  .route("/:id")
  .get(productController.getSingleProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
