// Error Handler Class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // error class constructor
    this.statusCode = statusCode;

    Error.captureStackTrace(this.constructor);

    //this -> Pass in the object itself
    // this.constructor => Pass in the constructor function
  }
}

module.exports = ErrorHandler;
