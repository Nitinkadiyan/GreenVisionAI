const mongoose = require("mongoose");
const User = require("../models/User.js");

// Create an embedded volunteer profile for the logged-in user.
// This should be called when the user accepts their first cleanup task.
const createVolunteer = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User ID not found.",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (user.volunteerProfile) {
            return res.status(200).json({
                success: true,
                message: "Volunteer profile already exists.",
                volunteer: user,
            });
        }

        user.volunteerProfile = {
            points: 0,
            tasksAccepted: 0,
            completionPercentage: 0,
            totalReportsWorked: 0,
            rewardsRedeemed: 0,
            totalPointsEarned: 0,
            currentTask: null,
            status: "available",
        };

        await user.save();

        return res.status(201).json({
            success: true,
            message: "Volunteer profile created successfully.",
            volunteer: user,
        });
    } catch (error) {
        console.error("Create Volunteer Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create volunteer profile.",
        });
    }
};

// Get the logged-in user's volunteer profile
const getMyVolunteerProfile = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User ID not found.",
            });
        }

        const user = await User.findOne({
            _id: userId,
            volunteerProfile: {$ne: null},
        })
        .select("name email phone profilePicture location createdAt volunteerProfile")
        .populate("volunteerProfile.currentTask")
        .lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Volunteer profile not found.",
                volunteer: null,
            });
        }

        return res.status(200).json({
            success: true,
            volunteer: user,
        });
    } catch (error) {
        console.error("Get My Volunteer Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch volunteer profile.",
        });
    }
};

// Get all volunteer profiles from the User collection
const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await User.find({
            volunteerProfile: {$ne: null},
        })
        .select("name email phone profilePicture location createdAt volunteerProfile")
        .populate("volunteerProfile.currentTask")
        .sort({createdAt: -1})
        .lean();

        return res.status(200).json({
            success: true,
            count: volunteers.length,
            volunteers,
        });
    } catch (error) {
        console.error("Get All Volunteers Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch volunteers.",
        });
    }
};

// Get a specific volunteer using the User document ID
const getVolunteerById = async (req, res) => {
    try {
        const {volunteerId} = req.params;

        if (!mongoose.Types.ObjectId.isValid(volunteerId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid volunteer ID.",
            });
        }

        const volunteer = await User.findOne({
            _id: volunteerId,
            volunteerProfile: {$ne: null},
        })
        .select("name email phone profilePicture location createdAt volunteerProfile")
        .populate("volunteerProfile.currentTask")
        .lean();

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found.",
            });
        }

        return res.status(200).json({
            success: true,
            volunteer,
        });
    } catch (error) {
        console.error("Get Volunteer By ID Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch volunteer profile.",
        });
    }
};

// Update a volunteer's availability/status
const updateVolunteerStatus = async (req, res) => {
    try {
        const {volunteerId} = req.params;
        const {status} = req.body;

        if (!mongoose.Types.ObjectId.isValid(volunteerId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid volunteer ID.",
            });
        }

        const allowedStatus = ["available", "working", "under-review"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid volunteer status.",
                allowedStatus,
            });
        }

        const volunteer = await User.findOneAndUpdate(
            {
                _id: volunteerId,
                volunteerProfile: {$ne: null},
            },
            {
                $set: {
                    "volunteerProfile.status": status,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        )
        .select("name email phone profilePicture location volunteerProfile")
        .populate("volunteerProfile.currentTask");

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Volunteer status updated successfully.",
            volunteer,
        });
    } catch (error) {
        console.error("Update Volunteer Status Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update volunteer status.",
        });
    }
};

// Update volunteer statistics.
// This function is intended to be called internally by other controllers.
const updateVolunteerStats = async (volunteerId, data = {}) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(volunteerId)) {
            throw new Error("Invalid volunteer ID.");
        }

        const allowedFields = [
            "tasksAccepted",
            "totalReportsWorked",
            "pointsEarned",
            "rewardsRedeemed",
            "completionPercentage",
        ];

        for (const field of Object.keys(data)) {
            if (!allowedFields.includes(field)) {
                throw new Error(`Unsupported volunteer statistic: ${field}.`);
            }

            const value = data[field];

            if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
                throw new Error(`Invalid value for ${field}.`);
            }
        }

        if (data.completionPercentage !== undefined && data.completionPercentage > 100) {
            throw new Error("completionPercentage cannot exceed 100.");
        }

        const update = {};
        const increment = {};

        if (data.tasksAccepted !== undefined) {
            increment["volunteerProfile.tasksAccepted"] = data.tasksAccepted;
        }

        if (data.totalReportsWorked !== undefined) {
            increment["volunteerProfile.totalReportsWorked"] = data.totalReportsWorked;
        }

        if (data.pointsEarned !== undefined) {
            increment["volunteerProfile.points"] = data.pointsEarned;
            increment["volunteerProfile.totalPointsEarned"] = data.pointsEarned;
        }

        if (data.rewardsRedeemed !== undefined) {
            increment["volunteerProfile.rewardsRedeemed"] = data.rewardsRedeemed;
        }

        if (data.completionPercentage !== undefined) {
            update["volunteerProfile.completionPercentage"] = data.completionPercentage;
        }

        const operations = {};

        if (Object.keys(increment).length > 0) {
            operations.$inc = increment;
        }

        if (Object.keys(update).length > 0) {
            operations.$set = update;
        }

        if (Object.keys(operations).length === 0) {
            throw new Error("No valid volunteer statistics provided.");
        }

        const volunteer = await User.findOneAndUpdate(
            {
                _id: volunteerId,
                volunteerProfile: {$ne: null},
            },
            operations,
            {
                new: true,
                runValidators: true,
            }
        )
        .select("name email volunteerProfile")
        .populate("volunteerProfile.currentTask");

        if (!volunteer) {
            throw new Error("Volunteer profile not found.");
        }

        return volunteer;
    } catch (error) {
        console.error("Update Volunteer Stats Error:", error);
        throw error;
    }
};

module.exports = {
    createVolunteer,
    getMyVolunteerProfile,
    getAllVolunteers,
    getVolunteerById,
    updateVolunteerStatus,
    updateVolunteerStats,
};
