const bcrypt = require("bcrypt");
const errorHandler = require("../middlewares/errorHandler.js");
const User = require("../models/users.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");

const getAllUsers = errorHandler(async (req, res, next) => {});

const getSingleUser = errorHandler(async (req, res, next) => {});

const addUser = errorHandler(async (req, res, next) => {
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
  const hashedPassword = await bcrypt.hash(password, 8);

  let newUser = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  });

  try {
    await newUser.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { newUser } });
  } catch (error) {
    return next(new customError(error.message, 501, httpStatusText.ERROR));
  }
});

const updateUser = errorHandler(async (req, res, next) => {});

const deleteUser = errorHandler(async (req, res, next) => {});

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
