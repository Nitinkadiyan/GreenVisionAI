const User = require("../models/User.js");

const governmentAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    if (user.role != "Government" && user.role != "Admin") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this service",
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { governmentAuth };
