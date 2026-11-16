const User = require("../models/User");
const CleanupTask = require("../models/cleanupTask");

// Common task fields and report population
const getVolunteerCleanupTasks = async (volunteerId) => {
    return await CleanupTask.find({
        volunteer: volunteerId,
    })
    .populate("report", "description location imageUrl priority status")
    .select("report reward guideline deadline status volunteer completion createdAt updatedAt")
    .sort({createdAt: -1})
    .lean();
};

// 1. REWARD STATISTICS
const getRewardStats = async (req, res) => {
    try {
        const volunteers = await User.find({
            volunteerProfile: {$ne: null},
        })
        .select("volunteerProfile")
        .lean();

        const totalVolunteers = volunteers.length;

        const totalPointsDistributed = volunteers.reduce(
            (sum, user) => sum + (user.volunteerProfile?.totalPointsEarned || 0),
            0
        );

        const totalCompletedTasks = await CleanupTask.countDocuments({
            status: "Completed",
        });

        const totalPendingReviews = await CleanupTask.countDocuments({
            status: {
                $in: ["Completion-Submitted", "Under-Review"],
            },
        });

        return res.status(200).json({
            success: true,
            stats: {
                totalVolunteers,
                totalPointsDistributed,
                totalCompletedTasks,
                totalPendingReviews,
            },
        });
    } catch (error) {
        console.error("Reward statistics error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch reward statistics",
        });
    }
};

// 2. LEADERBOARD
const getLeaderboard = async (req, res) => {
    try {
        const volunteers = await User.find({
            volunteerProfile: {$ne: null},
        })
        .select("name email phone location profilePicture volunteerProfile")
        .sort({
            "volunteerProfile.totalPointsEarned": -1,
        })
        .lean();

        const volunteerIds = volunteers.map((volunteer) => volunteer._id);

        // Fetch completed task counts
        const completedTasks = await CleanupTask.aggregate([
            {
                $match: {
                    volunteer: {$in: volunteerIds},
                    status: "Completed",
                },
            },
            {
                $group: {
                    _id: "$volunteer",
                    completedCount: {$sum: 1},
                },
            },
        ]);

        const completedTaskMap = new Map(completedTasks.map((task) => [task._id.toString(), task.completedCount]));

        // Fetch actual cleanup task documents for all volunteers
        const allCleanupTasks = await CleanupTask.find({
            volunteer: {$in: volunteerIds},
        })
        .populate("report", "description location imageUrl priority status")
        .select("report reward guideline deadline status volunteer completion createdAt updatedAt")
        .sort({createdAt: -1})
        .lean();

        // Group tasks by volunteer ID
        const cleanupTaskMap = new Map();

        allCleanupTasks.forEach((task) => {
            const volunteerId = task.volunteer.toString();

            if (!cleanupTaskMap.has(volunteerId)) {
                cleanupTaskMap.set(volunteerId, []);
            }

            cleanupTaskMap.get(volunteerId).push(task);
        });

        // Build leaderboard
        const leaderboard = volunteers.map((volunteer, index) => {
            const profile = volunteer.volunteerProfile || {};

            const volunteerId = volunteer._id.toString();

            return {
                rank: index + 1,
                _id: volunteer._id,
                name: volunteer.name,
                email: volunteer.email,
                phone: volunteer.phone || null,
                location: volunteer.location?.city || null,
                profilePicture: volunteer.profilePicture?.url || null,

                points: profile.points || 0,
                totalPointsEarned: profile.totalPointsEarned || 0,
                status: profile.status || "Available",
                tasksAccepted: profile.tasksAccepted || 0,

                completedTasks: completedTaskMap.get(volunteerId) || 0,

                completionPercentage: profile.completionPercentage || 0,

                rewardsRedeemed: profile.rewardsRedeemed || 0,

                // Actual cleanup task documents
                cleanupTasks: cleanupTaskMap.get(volunteerId) || [],
            };
        });

        return res.status(200).json({
            success: true,
            totalVolunteers: leaderboard.length,
            leaderboard,
        });
    } catch (error) {
        console.error("Leaderboard error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard",
        });
    }
};

// 3. GET REWARDS OF A PARTICULAR VOLUNTEER
const getVolunteerRewards = async (req, res) => {
    try {
        const {volunteerId} = req.params;

        const volunteer = await User.findOne({
            _id: volunteerId,
            volunteerProfile: {$ne: null},
        })
        .select("name email phone location profilePicture volunteerProfile")
        .lean();

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found",
            });
        }

        // Fetch all cleanup tasks for this volunteer
        const cleanupTasks = await getVolunteerCleanupTasks(volunteerId);

        // Preserve the completed tasks separately
        const completedTasks = cleanupTasks.filter((task) => task.status === "Completed");

        const profile = volunteer.volunteerProfile || {};

        return res.status(200).json({
            success: true,

            volunteer: {
                _id: volunteer._id,
                name: volunteer.name,
                email: volunteer.email,
                phone: volunteer.phone || null,
                location: volunteer.location?.city || null,
                profilePicture: volunteer.profilePicture?.url || null,

                status: profile.status || "Available",
                points: profile.points || 0,
                totalPointsEarned: profile.totalPointsEarned || 0,
                tasksAccepted: profile.tasksAccepted || 0,
                completionPercentage: profile.completionPercentage || 0,
                rewardsRedeemed: profile.rewardsRedeemed || 0,
            },

            // All tasks
            cleanupTasks,

            // Completed tasks only
            completedTasks,
        });
    } catch (error) {
        console.error("Volunteer rewards error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch volunteer rewards",
        });
    }
};

// 4. GET LOGGED-IN VOLUNTEER REWARDS
const getMyRewards = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId)
        .select("name email phone location profilePicture volunteerProfile")
        .lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profile = user.volunteerProfile;

        // Fetch actual cleanup task documents
        const cleanupTasks = await getVolunteerCleanupTasks(userId);

        const completedTasks = cleanupTasks.filter((task) => task.status === "Completed").length;

        if (!profile) {
            return res.status(200).json({
                success: true,
                message: "No volunteer contributions found yet",

                rewards: {
                    points: 0,
                    totalPointsEarned: 0,
                    tasksAccepted: 0,
                    completedTasks: 0,
                    completionPercentage: 0,
                    rewardsRedeemed: 0,
                },

                cleanupTasks: [],

                user: {
                    name: user.name,
                    profilePicture: user.profilePicture?.url || null,
                },
            });
        }

        const rank =
            (await User.countDocuments({
                "volunteerProfile.totalPointsEarned": {
                    $gt: profile.totalPointsEarned || 0,
                },
            })) + 1;

        return res.status(200).json({
            success: true,
            message: "Your contribution details fetched successfully",

            user: {
                name: user.name,
                profilePicture: user.profilePicture?.url || null,
                email: user.email,
                phone: user.phone || null,
                location: user.location?.city || null,
            },

            rewards: {
                points: profile.points || 0,
                totalPointsEarned: profile.totalPointsEarned || 0,
                tasksAccepted: profile.tasksAccepted || 0,
                completedTasks,
                status: profile.status || "Available",
                completionPercentage: profile.completionPercentage || 0,
                rewardsRedeemed: profile.rewardsRedeemed || 0,
                rank,
            },

            // All cleanup tasks belonging to logged-in volunteer
            cleanupTasks,
        });
    } catch (error) {
        console.error("Get my rewards error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch your contribution details",
        });
    }
};

module.exports = {
    getRewardStats,
    getLeaderboard,
    getVolunteerRewards,
    getMyRewards,
};
    