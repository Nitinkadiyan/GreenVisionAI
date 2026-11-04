const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.TOKEN_KEY_SECRET);

    // Fetch the latest user information from MongoDB
    const user = await User.findById(decoded.id).select(
      "-password -confirmPassword",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Always use the current database role
    req.user = {
      id: user._id,
      role: user.role,
    };

    console.log("Authenticated user:", req.user);

    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);

    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { verifyToken };
