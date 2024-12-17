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
    jwt.verify(token, process.env.SECERT_JWT_KEY, (err, user) => {
      if (err) {
        return next(new customError(err.message, 400, httpStatusTxt.FAIL));
      }
      console.log(user);
      if (req.params.id === user.id || user.isAdmin) {
        next();
      } else {
        return next(
          new customError("You are not allowed", 403, httpStatusTxt.FAIL)
        );
      }
    });
  } catch (error) {
    return next(
      new customError("Error Invalid Token", 403, httpStatusTxt.FAIL)
    );
  }
};

module.exports = verifyToken;

// "newUser": {
//             "username": "admin",
//             "email": "admin@admin.com",
//             "password": "$2b$08$tITtCWMDjaY0VcDzM4CGxeJFInYpDFrLyKOBCHHDXbOHgPzp8JRU6",
//             "isAdmin": true,
//             "_id": "676134c0558a24813530809c",
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NzYxMzRjMDU1OGEyNDgxMzUzMDgwOWMiLCJpYXQiOjE3MzQ0MjM3NDQsImV4cCI6MTczNDUxMDE0NH0.zd3HiQSNyPUvt_qv3AUNV7P7ktcVl_-Jj7B6LUJYA4M",
//             "createdAt": "2024-12-17T08:22:24.806Z",
//             "updatedAt": "2024-12-17T08:22:24.806Z",
//             "__v": 0
//         }
