const errorHandler = require("../middlewares/errorHandler.js");
const Order = require("../models/Orders.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");

const getAllOrders = errorHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({});
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { orders } });
  } catch (error) {
    return next(
      new customError(`can't find this order: ${error.message} `),
      500,
      httpStatusText.ERROR
    );
  }
});

const getUserOrders = errorHandler(async (req, res, next) => {
  try {
    const order = await Order.find(
      { userId: req.params.id },
      {
        _id: false,
        __v: false,
      }
    );
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: order });
  } catch (error) {
    return next(
      new customError(`can't find this order: ${error.message} `),
      404,
      httpStatusText.FAIL
    );
  }
});

const addOrder = errorHandler(async (req, res, next) => {
  try {
    let newOrder = new Order({ ...req.body });
    await newOrder.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { newOrder } });
  } catch (error) {
    return next(new customError(error.message, 501, httpStatusText.ERROR));
  }
});

const updateOrder = errorHandler(async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const updatedOrder = await Order.updateOne(
      { userId: id },
      {
        $set: { ...req.body },
      }
    );
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: updatedOrder,
    });
  } else {
    return next(new customError(`update failed`, 500, httpStatusText.ERROR));
  }
});

const deleteOrder = errorHandler(async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "Order has been removed",
      data: deletedOrder,
    });
  } catch (error) {
    return next(
      new customError(`can't delete this order: ${error.message} `),
      500,
      httpStatusText.ERROR
    );
  }
});

module.exports = {
  getAllOrders,
  getUserOrders,
  addOrder,
  updateOrder,
  deleteOrder,
};
