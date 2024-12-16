const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const httpStatusTxt = require("../utils/httpStatusText");

const verifyToken = async (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    return next(new customError("Token is Required", 401, httpStatusTxt.ERROR));
  }
  const token = authHeader;

  try {
    await jwt.verify(token, process.env.SECERT_JWT_KEY, (err, user) => {
      if (user.id === req.params.id || user.isAdmin) {
        next();
      } else {
        return next(
          new customError(
            "You are not allowed to access this resource",
            403,
            httpStatusTxt.FAIL
          )
        );
      }
      next();
    });
  } catch (error) {
    return next(
      new customError("Error Invalid Token", 403, httpStatusTxt.FAIL)
    );
  }
};

module.exports = verifyToken;
