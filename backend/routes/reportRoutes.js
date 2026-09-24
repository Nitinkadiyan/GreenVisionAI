const express = require("express");
const { authorizeRoles } = require("../middleware/authorizeRole.js");
const router = express.Router();
const {
  createReport,
  analyzeReport,
  getAllReports,
  getReport,
  updateReport,
  deleteReport,
  getMyReports,
} = require("../controllers/reportController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/multer.js");

router.post(
  "/analyze",
  upload.fields([{ name: "image", maxCount: 1 }]),
  analyzeReport,
);
router.post(
  "/create-report",
  verifyToken,
  authorizeRoles("citizen"),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createReport,
);

router.get(
  "/get-reports",
  verifyToken,
  authorizeRoles("citizen"),
  getAllReports,
);

router.get("/my-reports", verifyToken, authorizeRoles("citizen"), getMyReports);
router.get(
  "/get-report/:id",
  verifyToken,
  authorizeRoles("citizen"),
  getReport,
);
router.patch(
  "/update-report/:id",
  verifyToken,
  authorizeRoles("citizen"),
  upload.single("imageUrl"),
  updateReport,
);
router.delete(
  "/delete-report/:id",
  verifyToken,
  authorizeRoles("citizen"),
  deleteReport,
);
module.exports = router;
