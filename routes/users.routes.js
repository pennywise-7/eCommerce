const router = require("express").Router();
const userController = require("../controllers/users.controller.js");
const verfiyToken = require("../middlewares/verifyToken.js");

router.route("/").get(verfiyToken, userController.getAllUsers);

router.route("/find/:id").get(userController.getSingleUser);
router.route("/update/:id").patch(verfiyToken, userController.updateUser);
router.route("/delete/:id").delete(verfiyToken, userController.deleteUser);

module.exports = router;
