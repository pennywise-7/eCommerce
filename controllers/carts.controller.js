const errorHandler = require("../middlewares/errorHandler.js");
const Cart = require("../models/carts.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");

const getAllCarts = errorHandler(async (req, res, next) => {});

const getSingleCart = errorHandler(async (req, res, next) => {});

const addCart = errorHandler(async (req, res, next) => {});

const updateCart = errorHandler(async (req, res, next) => {});

const deleteCart = errorHandler(async (req, res, next) => {});

module.exports = {
  getAllCarts,
  getSingleCart,
  addCart,
  updateCart,
  deleteCart,
};
