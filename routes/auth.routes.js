const router = require("express").Router();
const userController = require("../controllers/users.controller.js");

router.route("/register").post(userController.addUser);

router.route("/login").post(userController.getSingleUser);

module.exports = router;
