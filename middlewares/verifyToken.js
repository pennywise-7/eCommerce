const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const httpStatusTxt = require("../utils/httpStatusText");

const verifyToken = (req, res, next) => {
  const authHeaders =
    req.headers["Authorization"] || req.headers["Authorization"];

  if (!authHeaders) {
    return next(new customError("Token is Required", 401, httpStatusTxt.ERROR));
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    next();
  } catch (error) {
    return next(
      new customError("Error Invalid Token", 401, httpStatusTxt.FAIL)
    );
  }
};

module.exports = verifyToken;
