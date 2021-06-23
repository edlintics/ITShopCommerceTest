const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    vaildate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    seclect: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      requried: true,
    },
  },
  role: {
    type: String,
    default: "true",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String, // use for reset password purpose
  resetPasswordExpire: Date,
});

// encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //if the password is not mdoified
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
