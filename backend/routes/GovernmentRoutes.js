const express = require("express");

const router = express.Router();
const { governmentAuth } = require("../middleware/governmentMiddleware.js");
const {
  getAllGovReports,
  approveReport,
  rejectReport,
  assignPriority,
  assignDeadline,
  assignReward,
  escalateReport,
  reportAnalytics,
  assignReport,
  updateReportStatus,
} = require("../controllers/governmemtController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

router.get("/get-all-reports", verifyToken, governmentAuth, getAllGovReports);
router.patch("/report/:id/approve", verifyToken, governmentAuth, approveReport);
router.patch("/report/:id/reject", verifyToken, governmentAuth, rejectReport);
router.patch(
  "/report/:id/assign-priority",
  verifyToken,
  governmentAuth,
  assignPriority,
);
router.patch(
  "/report/:id/deadline",
  verifyToken,
  governmentAuth,
  assignDeadline,
);
router.patch(
  "/report/:id/assign-reward",
  verifyToken,
  governmentAuth,
  assignReward,
);
router.patch(
  "/report/:id/escalte-report",
  verifyToken,
  governmentAuth,
  escalateReport,
);

router.patch("/reports/:id/assign", verifyToken, governmentAuth, assignReport);

router.get("/analytics", verifyToken, governmentAuth, reportAnalytics);
router.patch(
  "/reports/:id/status",
  verifyToken,
  governmentAuth,
  updateReportStatus,
);

module.exports = router;
