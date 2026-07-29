const User = require("../models/User.js");
const { createSecretToken } = require("../utils/secretToken.js");
const bcrypt = require("bcrypt");
const otpTemplate = require("../templates/otpTemplate");
const sendEmail = require("../utils/sendEmail.js");
const Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const user = await User.create({
      email,
      password,
      username,
      otp,
      otpExpiry,
      isVerified: false,
      createdAt,
    });

    const html = otpTemplate(user.username, otp);

    await sendEmail(user.email, "Verify Your Email", html);

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });
  } catch (err) {
    message: (err.message, console.log(err));
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Incomplete fields",
      });
    }
    console.log(password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user Not Found",
      });
    }
    console.log(user.password);
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({
        message: "incorrect password",
      });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User LoggedIn Successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(otp);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    console.log(user.email);
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid Otp",
      });
    }
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      user,
      success: true,
      message: "Email verified Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: err.message,
      success: false,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await User.updateOne(
      {
        email,
      },
      {
        $set: {
          otp: otp,
          otpExpiry: otpExpiry,
        },
      },
    );
    const user1 = await User.findOne({ email });
    const html = otpTemplate(user1.name, otp);
    await sendEmail(email, "Forgot Password?", html);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to registered email account.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
const verifyOtp = async (req, res) => {
  try {
    const { email,otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid Otp",
      });
    }
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
    user.resetVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(201).json({
      user,
      message: "Otp has been verified",
      success: true,
    });
  } catch (error) {
    console.log(error);R
    message: err.message;
  }
};
const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.resetVerified);
    if (!user.resetVerified) {
      return res.status(402).json({
        success: false,
        message: "Not Verified",
      });
    }
    await User.updateOne(
      { email },
      {
        $set: {
          password: password,
        },
      },
    );
    return res.status(200).json({
      success: true,
      message: "Your Password has been updated successfully.",
    });
    user.resetVerified = false;
    await user.save();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const Logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
  });
  return res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};
module.exports = {
  Signup,
  Login,
  Logout,
  verifyEmail,
  changePassword,
  resetPassword,
  verifyOtp,
};
