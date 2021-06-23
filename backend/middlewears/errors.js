const ErrorHandler = require("../utils/errorHandler"); // import the standard Hander class we just created

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // 500 is Internal server error
  err.mesage = err.message || "Internal Server Error";

  // seperate the errors appearance in prodcution and development mode

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(err);
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack, // present full stack of error in the development mode
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err }; // crate new error from the existing err passed

    error.message = err.message;

    // Wrong mongoose Object Id error
    if (err.name === "CastError") {
      const message = `Resources not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handle Mongoose Validation error
    if (err.name == "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message); // map out the error return in the object
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      error: error.message || "Internal server error", // import the err instance that created above
    });
  }
};
