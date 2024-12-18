const jwt = require("jsonwebtoken");

module.exports = async (payload, exp = "10d") => {
  return await jwt.sign(payload, process.env.SECERT_JWT_KEY, {
    expiresIn: exp,
  });
};
