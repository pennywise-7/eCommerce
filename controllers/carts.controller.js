const errorHandler = require("../middlewares/errorHandler.js");
const Cart = require("../models/Carts.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");

const getAllCarts = errorHandler(async (req, res, next) => {
  try {
    const carts = Cart.find({});
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { carts } });
  } catch (error) {
    return next(
      new customError(`can't find this cart: ${error.message} `),
      500,
      httpStatusText.ERROR
    );
  }
});

const getSingleCart = errorHandler(async (req, res, next) => {
  try {
    const cart = await Cart.find(
      { userId: req.params.id },
      {
        _id: false,
        __v: false,
      }
    );
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: cart });
  } catch (error) {
    return next(
      new customError(`can't find this cart: ${error.message} `),
      404,
      httpStatusText.FAIL
    );
  }
});

const addCart = errorHandler(async (req, res, next) => {
  try {
    let newCart = new Cart({ ...req.body });
    await newCart.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { newCart } });
  } catch (error) {
    return next(new customError(error.message, 501, httpStatusText.ERROR));
  }
});

const updateCart = errorHandler(async (req, res, next) => {
  const userId = req.params.id;
  if (userId) {
    const updatedCart = await Cart.updateOne(
      { userId: userId },
      {
        $set: { ...req.body },
      }
    );
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: updatedCart,
    });
  } else {
    return next(new customError(`update failed`, 500, httpStatusText.ERROR));
  }
});

const deleteCart = errorHandler(async (req, res, next) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "Cart has been removed",
      data: deletedCart,
    });
  } catch (error) {
    return next(
      new customError(`can't delete this cart: ${error.message} `),
      500,
      httpStatusText.ERROR
    );
  }
});

module.exports = {
  getAllCarts,
  getSingleCart,
  addCart,
  updateCart,
  deleteCart,
};
