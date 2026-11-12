const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middleware/authMiddleware.js");
const {authorizeRoles} = require("../middleware/authorizeRole.js");

const {
    createVolunteer,
    getMyVolunteerProfile,
    getAllVolunteers,
    getVolunteerById,
    updateVolunteerStatus,
} = require("../controllers/volunteerController.js");

// Citizen: create embedded volunteer profile
router.post("/create", verifyToken, createVolunteer);

// Logged-in user: get their own volunteer profile
router.get("/me", verifyToken, getMyVolunteerProfile);

// Government: get all volunteer profiles
router.get("/all", verifyToken, authorizeRoles("government"), getAllVolunteers);

// Government: get a volunteer using their User ID
router.get("/:volunteerId", verifyToken, authorizeRoles("government"), getVolunteerById);

// Government: update volunteer status
router.patch("/:volunteerId/status", verifyToken, authorizeRoles("government"), updateVolunteerStatus);

module.exports = router;
