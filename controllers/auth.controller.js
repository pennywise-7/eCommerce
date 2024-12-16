const bcrypt = require("bcrypt");
const errorHandler = require("../middlewares/errorHandler.js");
const User = require("../models/users.model.js");
const customError = require("../utils/customError.js");
const httpStatusText = require("../utils/httpStatusText.js");
const generateToken = require("../utils/generateJWT.js");

const login = errorHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return next(new customError("user not found", 404, httpStatusText.FAIL));
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { user } });
  } else {
    return next(
      new customError("Wrong password try again", 400, httpStatusText.FAIL)
    );
  }
});

const register = errorHandler(async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  if (!password) {
    return next(
      new customError(
        "Bad Input or missing values => { password }",
        400,
        httpStatusText.FAIL
      )
    );
  }
  const hashedPassword = await bcrypt.hash(
    password,
    +process.env.SECERT_SALT_KEY
  );

  let newUser = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  });
  const token = await generateToken({
    username: newUser.username,
    id: newUser._id,
  });
  newUser.token = token;
  try {
    await newUser.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { newUser } });
  } catch (error) {
    return next(new customError(error.message, 501, httpStatusText.ERROR));
  }
});

module.exports = {
  login,
  register,
};
