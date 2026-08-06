const express = require("express");

const router = express.Router();
const {
  createReport,
  getAllReports,
  getReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");
const { upload } = require("../middleware/multer.js");

router.post(
  "/create-report",
  verifyToken,
  upload.single("imageUrl"),
  createReport,
);

router.get("/get-report", verifyToken, getAllReports);
router.get("/get-report/:id", verifyToken, getReport);
router.patch(
  "/update-report/:id",
  verifyToken,
  upload.single("imageUrl"),
  updateReport,
);
router.delete("/delete-report/:id", verifyToken, deleteReport);
module.exports = router;
