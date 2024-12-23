const bcrypt = require("bcrypt");
const errorHandler = require("../middlewares/errorHandler.js");
const User = require("../models/users.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");
const generateToken = require("../utils/generateJWT.js");
const fs = require("node:fs");
const loginPage = fs.readFileSync(
  __dirname + "/../public/html/login.html",
  "utf-8"
);
const registerPage = fs.readFileSync(
  __dirname + "/../public/html/register.html",
  "utf-8"
);

const renderLogin = errorHandler(async (req, res, next) => {
  res.send(loginPage);
});

const login = errorHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return next(new customError("user not found", 404, httpStatusText.FAIL));
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = await generateToken({
      id: user._id,
      isAdmin: user.isAdmin,
    });
    user.token = token;
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { username: user.username, email: user.email },
    });
  } else {
    return next(
      new customError("Wrong password try again", 400, httpStatusText.FAIL)
    );
  }
});

const renderRegister = errorHandler(async (req, res, next) => {
  res.send(registerPage);
});
const register = errorHandler(async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  if (!password) {
    return next(
      new customError(
        "Bad Input or missing values => { password }",
        400,
        httpStatusText.FAIL
      )
    );
  }
  const hashedPassword = await bcrypt.hash(
    password,
    +process.env.SECERT_SALT_KEY
  );

  let newUser = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  });
  const token = await generateToken({
    id: newUser._id,
    isAdmin: newUser.isAdmin,
  });
  newUser.token = token;
  try {
    await newUser.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: newUser });
  } catch (error) {
    return next(new customError(error.message, 501, httpStatusText.ERROR));
  }
});

module.exports = {
  login,
  register,
  renderLogin,
  renderRegister,
};
