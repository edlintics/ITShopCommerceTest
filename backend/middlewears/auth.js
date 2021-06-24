const User = require("../models/user");

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticated or not

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // We will authenticate the user on the back end rather on the front end, for security purpose

  const { token } = req.cookies; // capture the token when teh user seend request

  if (!token) {
    return next(new ErrorHandler("Login first to access thsi resoure. 401"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET); // check if the json web token secret match the server side secret

  req.user = await User.findById(decoded.id); // since we stored the id in the cookies, we can use id to query from the db

  next();
});
