const Volunteer = require("../models/Volunteer");
const User = require("../models/User");

const createVolunteer = async (req, res) => {
  try {
    const userId = req.user.id;
    const existingVolunteer = await Volunteer.findOne({ userId });
    if (existingVolunteer) {
      return res.status(200).json({
        success: true,
        message: "User profile found ",
        volunteer: existingVolunteer,
      });
    }
    const user = User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const volunteer = await Volunteer.create({
      userId,
    });
    return res.status(201).json({
      success: true,
      message: "Volunteer profile created successfully",
      volunteer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Volnteer Profile",
    });
  }
};

const getMyVolunteerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const volunteer = await Volunteer.findOne({ userId });
    if (!volunteer) {
      return res.status(200).json({
        success: true,
        message: "Volunteer not found",
      });
    }
    return res.status(200).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    console.error("Get Volunteer Profile Error");
    return res.status(500).json({
      success: false,
      messsage: "Failed to fetch Volunteer Profile",
    });
  }
};

const getAllVolunteers = async (req, res) => {
  try {
    const Volunteers = await Volunteer.find()
      .populate("userId", "name email phone location profilePicture")
      .populate("currentTask");
    return res.status(200).json({
      success: true,
      count: Volunteers.length,
      Volunteers,
    });
  } catch (error) {
    console.error("Get all volunteers error");
    return res.status(500).json({
      success: false,
      message: "Failed to fetch volunteers",
    });
  }
};

const getVolunteerById = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(200).json({
        success: true,
        message: "Volunteer not found",
      });
    }
    return res.status(200).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    console.error("Get Volunteer  Error");
    return res.status(500).json({
      success: false,
      messsage: "Failed to fetch Volunteer Profile",
    });
  }
};

const updateVolunteerStatus = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const { status } = req.body;
    const allowedStatus = ["available", "working", "under-review"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Volunteer Status",
      });
    }
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }
    volunteer.status = status;
    await volunteer.save();
    return res.status(200).json({
      success: true,
      message: "Volunteer status updated successfully",
      volunteer,
    });
  } catch (error) {
    console.error("Update error in volunteer profile");
    return res.status(500).json({
      success: false,
      message: "failed to update volunteer",
    });
  }
};
const updateVolunteerStats = async (volunteerId, data) => {
  const volunteer = await Volunteer.findById(volunteerId);

  if (!volunteer) {
    throw new Error("Volunteer not found");
  }

  if (data.tasksAccepted !== undefined) {
    volunteer.tasksAccepted += data.tasksAccepted;
  }

  if (data.tasksCompleted !== undefined) {
    volunteer.tasksCompleted += data.tasksCompleted;
  }

  if (data.totalReportsWorked !== undefined) {
    volunteer.totalReportsWorked += data.totalReportsWorked;
  }

  if (data.pointsEarned !== undefined) {
    volunteer.totalPointsEarned += data.pointsEarned;
    volunteer.points += data.pointsEarned;
  }

  if (data.rewardsRedeemed !== undefined) {
    volunteer.rewardsRedeemed += data.rewardsRedeemed;
  }

  if (volunteer.tasksAccepted > 0) {
    volunteer.completionRate =
      (volunteer.tasksCompleted / volunteer.tasksAccepted) * 100;

    volunteer.completionRate = Number(volunteer.completionRate.toFixed(2));
  }

  await volunteer.save();

  return volunteer;
};
module.exports = {
  createVolunteer,
  getMyVolunteerProfile,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteerStatus,
  updateVolunteerStats,
};
