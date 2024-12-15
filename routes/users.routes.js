const router = require("express").Router();
const userController = require("../controllers/users.controller.js");

router.route("/").get(userController.getAllUsers).post(userController.addUser);

router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;