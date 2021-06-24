// Create and send Token and save in the cookie
const sendToken = (user, statusCode, res) => {
  //Create Jwt token
  const token = user.getJwtToken();

  //Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      //                                           *24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    ),
    httpOnly: true, // only allow the cookie to access
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  }); // store the jwt Token in a cookie
};

module.exports = sendToken;
