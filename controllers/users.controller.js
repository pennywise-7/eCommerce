const bcrypt = require("bcrypt");
const errorHandler = require("../middlewares/errorHandler.js");
const User = require("../models/users.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");

const getAllUsers = errorHandler(async (req, res, next) => {
  try {
    const users = await User.find({}, { __v: false, password: false });
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { users } });
  } catch (error) {
    return next(
      new customError(`can't find this user: ${error.message} `),
      500,
      httpStatusText.ERROR
    );
  }
});

const getSingleUser = errorHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: user });
  } catch (error) {
    return next(
      new customError(`can't find this user: ${error.message} `),
      404,
      httpStatusText.FAIL
    );
  }
});

const addUser = errorHandler(async (req, res, next) => {
  try {
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
    await newUser.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { newUser } });
  } catch (error) {
    return next(new customError(error.message, 501, httpStatusText.ERROR));
  }
});

const updateUser = errorHandler(async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    hashedPassword = await bcrypt.hash(
      req.body.password,
      +process.env.SECERT_SALT_KEY
    );
    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: { password: hashedPassword },
    });
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: updatedUser,
    });
  } else {
    return next(new customError(`update failed`, 500, httpStatusText.ERROR));
  }
});

const deleteUser = errorHandler(async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "User has been removed",
      data: deletedUser,
    });
  } catch (error) {
    return next(
      new customError(`can't delete this user: ${error.message} `),
      500,
      httpStatusText.ERROR
    );
  }
});

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
