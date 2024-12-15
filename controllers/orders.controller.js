const errorHandler = require("../middlewares/errorHandler.js");
const Order = require("../models/orders.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");

const getAllOrders = errorHandler(async (req, res, next) => {});

const getSingleOrder = errorHandler(async (req, res, next) => {});

const addOrder = errorHandler(async (req, res, next) => {});

const updateOrder = errorHandler(async (req, res, next) => {});

const deleteOrder = errorHandler(async (req, res, next) => {});

module.exports = {
  getAllOrders,
  getSingleOrder,
  addOrder,
  updateOrder,
  deleteOrder,
};
