const {
  Signup,
  Login,
  Logout,
  verifyEmail,
  resetPassword,
  changePassword,
  verifyOtp,
  getUser,
  updateUser,
  GoogleAuth,
  sendMobileOtp,
  verifyMobileOtp,
} = require("../controllers/authController.js");
const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware.js");
const router = express.Router();
const upload = require("../middleware/multer.js");
router.get("/me", verifyToken, getUser);
router.post("/google", GoogleAuth);
router.post("/send-mobile-otp", sendMobileOtp);
router.post("/verify-mobile-otp", verifyMobileOtp);
router.post("/signup", upload.single("profilePicture"), Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/verify-email", verifyEmail);
router.post("/change-password", changePassword);
router.post("/reset-password", resetPassword);
router.post("/verifyOtp", verifyOtp);
router.patch("/update-user", verifyToken, updateUser);
module.exports = router;
