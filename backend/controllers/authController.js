const User = require("../models/User.js");
const { createSecretToken } = require("../utils/secretToken.js");
const bcrypt = require("bcrypt");
const otpTemplate = require("../templates/otpTemplate");
const sendEmail = require("../utils/sendEmail.js");
const cloudinary = require("../utils/cloudinary.js");
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const dotenv = require("dotenv");
require("dotenv").config();
const Signup = async (req, res) => {
  try {
    console.log(req.body);
    const {
      email,
      phone,
      password,
      name,
      city,
      area,
      confirmPassword,
      createdAt,
      role,
      accessCode,
    } = req.body;
    console.log("========== SIGNUP DEBUG ==========");
    console.log("Received role:", role);
    console.log("Received body:", req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    if (role == "government") {
      if (!accessCode) {
        return res.status(400).json({
          success: false,
          message: "Government accessCode not found",
        });
      }
      if (accessCode !== process.env.GOVERNMENT_ACCESS_CODE) {
        return res.status(403).json({
          success: false,
          message: "Invalid government access code",
        });
      }
    }
    let profilePicture = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profilePicture = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }
    const user = await User.create({
      email,
      phone,
      password,
      name: name,
      otp,
      role,
      location: {
        city,
        area,
      },
      confirmPassword,
      otpExpiry,
      isVerified: false,
      createdAt,
      role,
      profilePicture: profilePicture,
    });
    console.log("Role stored in MongoDB:", user.role);

    const html = otpTemplate(user.name, otp);

    await sendEmail(user.email, "Verify Your Email", html);

    const token = createSecretToken(user._id, user.role);

    console.log("Role stored in MongoDB:", user.role);
    return res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
      token,
    });
  } catch (err) {
    message: (err.message, console.log(err));
  }
};
const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Incomplete fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    console.log(user.password);
    console.log(password);
    const auth = await bcrypt.compare(password, user.password);
    console.log(auth);
    if (!auth) {
      return res.json({
        message: "incorrect password",
      });
    }
    const token = createSecretToken(user._id, user.role);

    return res.status(201).json({
      message: "User LoggedIn Successfully",
      success: true,
      user,
      token,
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
      return res.status(404).json({
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
    const { email, otp } = req.body;
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
    console.log(error);
    R;
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
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.json({
        success: false,
        message: "User not existing",
      });
    }
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { name, email, city, phone } = req.body;
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.location.city = city;
    await user.save();
    const updatedUser = await User.findById(req.user.id).select(
      "-password -confirmPassword",
    );
    return res.status(201).json({
      success: true,
      message: "User Updated Successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(201).json({
      success: true,
      message: "User Deleted SuccessFully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GoogleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub: googleId, email, email_verified, name, picture } = payload;

    if (!email || !email_verified) {
      return res.status(401).json({
        success: false,
        message: "A verified Google email is required",
      });
    }

    // Find an account already linked to this Google ID
    let user = await User.findOne({ googleId });

    if (!user) {
      // Do not automatically link an existing local account
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message:
            "An account with this email already exists. Please log in using your existing method.",
        });
      }

      // Create a new citizen account
      user = await User.create({
        name,
        email,
        googleId,
        authProvider: "google",
        role: "citizen",
        isVerified: true,
        profilePicture: {
          url: picture || "",
          publicId: "",
        },
      });
    }

    // Issue GreenVision's own JWT
    const token = createSecretToken(user._id, user.role);

    // Remove sensitive fields from the returned user
    const safeUser = await User.findById(user._id).select(
      "-password -confirmPassword -otp -otpExpiry -accessCode",
    );

    return res.status(200).json({
      success: true,
      message: "Google authentication successful",
      user: safeUser,
      token,
    });
  } catch (error) {
    console.error("Google authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};
const sendMobileOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Find an existing account with this phone number
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this phone number",
      });
    }

    // Only allow login with a previously verified phone number
    if (!user.isPhoneVerified) {
      return res.status(403).json({
        success: false,
        message: "Phone number is not verified",
      });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP and expiry
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    // Development only: display OTP in the backend terminal
    if (process.env.NODE_ENV !== "production") {
      console.log(`Mobile OTP for ${phone}: ${otp}`);
    }

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
    });
  } catch (error) {
    console.error("Send mobile OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate OTP",
    });
  }
};
const verifyMobileOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    // Find the user using their phone number
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // Check whether the phone number is verified
    if (!user.isPhoneVerified) {
      return res.status(403).json({
        success: false,
        message: "Phone number is not verified",
      });
    }

    // Check OTP
    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check OTP expiry
    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Generate the existing authentication token
    const token = createSecretToken(user._id, user.role);

    // Return safe user information
    return res.status(200).json({
      success: true,
      message: "Mobile login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture,
      },
      token,
    });
  } catch (error) {
    console.error("Verify mobile OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};
module.exports = {
  Signup,
  Login,
  Logout,
  verifyEmail,
  changePassword,
  resetPassword,
  verifyOtp,
  getUser,
  updateUser,
  GoogleAuth,
  sendMobileOtp,
  verifyMobileOtp,
};
