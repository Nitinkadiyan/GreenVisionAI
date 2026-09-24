const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createVolunteer,
  getMyVolunteerProfile,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteerStats,
  updateVolunteerStatus,
} = require("../controllers/volunteerController");


router.post("/create",verifyToken,createVolunteer);
router.get("/me",verifyToken,getMyVolunteerProfile);
router.get("/all",verifyToken,getAllVolunteers);
router.get("/:volunteerId",verifyToken,getVolunteerById);
router.patch("/:volunteerId/status",updateVolunteerStatus);