const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const httpStatusTxt = require("../utils/httpStatusText");

const verifyToken = async (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    return next(new customError("Token is Required", 401, httpStatusTxt.ERROR));
  }

  const token = authHeader.split(" ")[1];

  try {
    await jwt.verify(token, process.env.SECERT_JWT_KEY);
    next();
  } catch (error) {
    return next(
      new customError("Error Invalid Token", 403, httpStatusTxt.FAIL)
    );
  }
};

module.exports = verifyToken;
