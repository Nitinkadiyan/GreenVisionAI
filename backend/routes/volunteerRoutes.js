const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware.js");
const router = express.Router();

const {
  createVolunteer,
  getMyVolunteerProfile,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteerStatus,
   updateVolunteerStats,
} = require("../controllers/volunteerController.js");


router.post("/create",verifyToken,createVolunteer);
router.get("/me",verifyToken,getMyVolunteerProfile);
router.get("/all",verifyToken,getAllVolunteers);
router.get("/:volunteerId",verifyToken,getVolunteerById);
router.patch("/:volunteerId/status",updateVolunteerStatus);

module.exports = router;