const router = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const verfiyToken = require("../middlewares/verifyToken.js");

router.route("/register").post(authController.register);

router.route("/login").get(authController.renderLogin).post(authController.login);

module.exports = router;
