const express = require("express");
const {authorizeRoles} = require("../middleware/authorizeRole.js");
const router = express.Router();
const {
  createReport,
  getAllReports,
  getReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");
const  upload  = require("../middleware/multer.js");

router.post(
  "/create-report",
  verifyToken,
  authorizeRoles("citizen"),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),
  createReport,
);

router.get("/get-report", verifyToken,authorizeRoles("government"), getAllReports);
router.get("/get-report/:id", verifyToken,authorizeRoles("citizen"), getReport);
router.patch(
  "/update-report/:id",
  verifyToken,
  authorizeRoles("citizen"),
  upload.single("imageUrl"),
  updateReport,
);
router.delete("/delete-report/:id",authorizeRoles("citizen"), verifyToken, deleteReport);
module.exports = router;
