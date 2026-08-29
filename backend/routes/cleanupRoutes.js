const express = require("express");
const router = express.Router();
const  upload  = require("../middleware/multer.js");
const { authorizeRoles } = require("../middleware/authorizeRole");
const {
  createCleanupTask,
  getCleanuptasks,
  getCleanupTaskById,
  updateCleanupTask,
  deleteCleanupTask,
  acceptCleanupTask,
  startCleanupTask,
  submitCleanupCompletion,
  UnderReviewTask,
  completeCleanupTask,
  rejectCleanuptask,
} = require("../controllers/cleanupController");
const { verifyToken } = require("../middleware/authMiddleware");
router.post(
  "/create-cleanup-task",
  verifyToken,
  authorizeRoles("citizen"),
  createCleanupTask,
);
router.get(
  "/clean-up-tasks",
  verifyToken,
  authorizeRoles("citizen"),
  getCleanuptasks,
);
router.get(
  "/clean-up-task/:id",
  verifyToken,
  authorizeRoles("citizen"),
  getCleanupTaskById,
);
router.patch(
  "/update-cleanup-task/:id",
  verifyToken,
  authorizeRoles("citizen"),
  updateCleanupTask,
);
router.delete(
  "/delete-cleanup-task/:id",
  verifyToken,
  authorizeRoles("citizen"),
  deleteCleanupTask,
);
router.patch(
  "/:id/accept",
  verifyToken,
  authorizeRoles("citizen"),
  acceptCleanupTask,
);
router.patch(
  "/:id/start",
  verifyToken,
  authorizeRoles("citizen"),
  startCleanupTask,
);
router.patch(
  "/:id/submit-completed-task",
  verifyToken,
  authorizeRoles("citizen"),
  upload.fields([
    { name: "beforeImage", maxCount: 1 },
    { name: "afterImage", maxCount: 1 },
  ]),
  submitCleanupCompletion,
);

router.get("/cleanup-task/under-review", UnderReviewTask);
router.patch(
  "/:id/complete-cleanup-task",
  verifyToken,
  authorizeRoles("citizen"),
  completeCleanupTask,
);
router.patch(
  "/:id/reject-cleanup-task",
  verifyToken,
  authorizeRoles("citizen"),
  rejectCleanuptask,
);
module.exports = router;
