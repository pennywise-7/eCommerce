const errorHandler = require("../middlewares/errorHandler.js");
const Product = require("../models/products.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");

const getAllProducts = errorHandler(async (req, res, next) => {});

const getSingleProduct = errorHandler(async (req, res, next) => {});

const addProduct = errorHandler(async (req, res, next) => {});

const updateProduct = errorHandler(async (req, res, next) => {});

const deleteProduct = errorHandler(async (req, res, next) => {});

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
