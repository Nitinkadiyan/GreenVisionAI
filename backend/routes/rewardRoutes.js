const express = require("express");
const router = express.Router();

const {getRewardStats, getLeaderboard, getVolunteerRewards,getMyRewards} = require("../controllers/rewardController.js");

const {verifyToken} = require("../middleware/authMiddleware");
const {authorizeRoles} = require("../middleware/authorizeRole.js");

router.get("/stats", verifyToken, authorizeRoles("government"), getRewardStats);

router.get("/leaderboard", verifyToken, authorizeRoles("government"), getLeaderboard);

router.get("/volunteer/:volunteerId", verifyToken, authorizeRoles("government"), getVolunteerRewards);
router.get("/my-rewards", verifyToken, getMyRewards);
module.exports = router;
