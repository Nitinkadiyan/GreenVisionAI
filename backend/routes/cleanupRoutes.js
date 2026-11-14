const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.js");
const {authorizeRoles} = require("../middleware/authorizeRole");
const {
    updateReportStatus,
    createCleanupTask,
    getCleanuptasks,
    getLandingPageTasks,
    getCleanupTaskById,
    updateCleanupTask,
    deleteCleanupTask,
    acceptCleanupTask,
    startCleanupTask,
    submitCleanupCompletion,
    UnderReviewTask,
    completeCleanupTask,
    rejectCleanuptask,
    releaseCleanupTask,
    sendTaskForManualReview,
    getGovernmentStats,
} = require("../controllers/cleanupController");
const {verifyToken} = require("../middleware/authMiddleware");
router.patch("/reports/:id/status", verifyToken, updateReportStatus);
router.post("/create-cleanup-task", verifyToken, authorizeRoles("government"), createCleanupTask);
router.get(
    "/clean-up-tasks",
    verifyToken,

    getCleanuptasks
);
router.get("/landing-page-tasks", getLandingPageTasks);
router.get(
    "/clean-up-task/:id",
    verifyToken,

    getCleanupTaskById
);
router.patch("/update-cleanup-task/:id", verifyToken, authorizeRoles("citizen"), updateCleanupTask);
router.delete("/delete-cleanup-task/:id", verifyToken, authorizeRoles("citizen"), deleteCleanupTask);
router.patch("/:id/accept", verifyToken, authorizeRoles("citizen"), acceptCleanupTask);
router.patch("/:id/start", verifyToken, authorizeRoles("citizen"), startCleanupTask);
router.patch(
    "/:id/submit-completed-task",
    verifyToken,
    authorizeRoles("citizen"),
    upload.fields([{name: "afterImage", maxCount: 1}]),
    submitCleanupCompletion
);

router.get("/cleanup-task/under-review", verifyToken, authorizeRoles("government"), UnderReviewTask);

router.patch("/:id/complete-cleanup-task", verifyToken, authorizeRoles("government"), completeCleanupTask);

router.patch("/:id/manual-review", verifyToken, authorizeRoles("government"), sendTaskForManualReview);

router.patch("/:id/reject-cleanup-task", verifyToken, authorizeRoles("government"), rejectCleanuptask);

router.patch("/:id/release-cleanup-task", verifyToken, authorizeRoles("citizen"), releaseCleanupTask);
router.get("/govt-officer-stats", verifyToken, authorizeRoles("government"), getGovernmentStats);
module.exports = router;
