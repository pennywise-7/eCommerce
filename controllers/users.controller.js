const errorHandler = require("../middlewares/errorHandler.js");
const User = require("../models/users.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");

const getAllUsers = errorHandler(async (req, res, next) => {});

const getSingleUser = errorHandler(async (req, res, next) => {});

const addUser = errorHandler(async (req, res, next) => {});

const updateUser = errorHandler(async (req, res, next) => {});

const deleteUser = errorHandler(async (req, res, next) => {});

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
