require("dotenv").config();
const { log } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const customError = require("./utils/customError.js");
const app = express();
const userRoute = require("./routes/users.routes.js");
const productRoute = require("./routes/products.routes.js");
const cartRoute = require("./routes/carts.routes.js");
const orderRoute = require("./routes/orders.routes.js");
const httpStatusText = require("./utils/httpStatusText.js");
const logger = require("morgan");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_CONN_STR)
  .then(() => {
    log("DB connection established");
  })
  .catch((error) => log(`Connection failed => ${error}`));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

// End Points
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.all("*", (req, res, next) => {
  return next(new customError("Not Found", 404, httpStatusText.FAIL));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText,
    error: {
      statusCode: err.statusCode,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT || 4000, () => {
  log(`Backend server is running on port ${process.env.PORT}`);
});
