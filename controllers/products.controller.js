const bcrypt = require("bcrypt");
const errorHandler = require("../middlewares/errorHandler.js");
const Product = require("../models/Products.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");

const getAllProducts = errorHandler(async (req, res, next) => {
  try {
    const products = await Product.find({}, { _id: false, __v: false });
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { products } });
  } catch (error) {
    return next(
      new customError(`can't find this product: ${error.message} `),
      500,
      httpStatusText.ERROR
    );
  }
});

const getSingleProduct = errorHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id, {
      _id: false,
      __v: false,
    });
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: product });
  } catch (error) {
    return next(
      new customError(`can't find this product: ${error.message} `),
      404,
      httpStatusText.FAIL
    );
  }
});

const addProduct = errorHandler(async (req, res, next) => {
  try {
    let newProduct = new Product({ ...req.body });
    await newProduct.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { newProduct } });
  } catch (error) {
    return next(new customError(error.message, 501, httpStatusText.ERROR));
  }
});

const updateProduct = errorHandler(async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const updatedProduct = await Product.updateOne(
      { _id: id },
      {
        $set: { ...req.body },
      }
    );
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: updatedProduct,
    });
  } else {
    return next(new customError(`update failed`, 500, httpStatusText.ERROR));
  }
});

const deleteProduct = errorHandler(async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "Product has been removed",
      data: deletedProduct,
    });
  } catch (error) {
    return next(
      new customError(`can't delete this product: ${error.message} `),
      500,
      httpStatusText.ERROR
    );
  }
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
