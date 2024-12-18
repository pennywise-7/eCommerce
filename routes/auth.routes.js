const router = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const verfiyToken = require("../middlewares/verifyToken.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router
  .route("/register")
  .get(authController.renderRegister)
  .post(urlencodedParser, authController.register);

router
  .route("/login")
  .get(authController.renderLogin)
  .post(urlencodedParser, authController.login);

module.exports = router;
