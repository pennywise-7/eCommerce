const router = require("express").Router();
const userController = require("../controllers/users.controller.js");
const verfiyToken = require("../middlewares/verifyToken.js");

router.route("/").get(verfiyToken, userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(verfiyToken, userController.updateUser)
  .delete(verfiyToken, userController.deleteUser);

module.exports = router;
