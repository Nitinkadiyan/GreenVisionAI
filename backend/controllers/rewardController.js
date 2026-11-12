const User = require("../models/User");
const CleanupTask = require("../models/cleanupTask");

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
            status: {$in: ["Completion-Submitted", "Under-Review"]},
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

const getLeaderboard = async (req, res) => {
    try {
        const volunteers = await User.find({
            volunteerProfile: {$ne: null},
        })
        .select("name email profilePicture volunteerProfile")
        .sort({"volunteerProfile.totalPointsEarned": -1})
        .lean();

        const volunteerIds = volunteers.map((volunteer) => volunteer._id);

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

        const leaderboard = volunteers.map((volunteer, index) => {
            const profile = volunteer.volunteerProfile || {};

            return {
                rank: index + 1,
                _id: volunteer._id,
                name: volunteer.name,
                profilePicture: volunteer.profilePicture?.url || null,

                points: profile.points || 0,
                totalPointsEarned: profile.totalPointsEarned || 0,

                tasksAccepted: profile.tasksAccepted || 0,

                completedTasks: completedTaskMap.get(volunteer._id.toString()) || 0,

                completionPercentage: profile.completionPercentage || 0,

                rewardsRedeemed: profile.rewardsRedeemed || 0,
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

const getVolunteerRewards = async (req, res) => {
    try {
        const {volunteerId} = req.params;

        const volunteer = await User.findOne({
            _id: volunteerId,
            volunteerProfile: {$ne: null},
        })
        .select("name email profilePicture volunteerProfile")
        .lean();

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found",
            });
        }

        const completedTasks = await CleanupTask.find({
            volunteer: volunteerId,
            status: "Completed",
        })
        .populate("report", "title location imageUrl")
        .select("report reward status updatedAt")
        .sort({updatedAt: -1})
        .lean();

        const profile = volunteer.volunteerProfile || {};

        return res.status(200).json({
            success: true,
            volunteer: {
                _id: volunteer._id,
                name: volunteer.name,
                email: volunteer.email,
                profilePicture: volunteer.profilePicture?.url || null,

                points: profile.points || 0,
                totalPointsEarned: profile.totalPointsEarned || 0,
                tasksAccepted: profile.tasksAccepted || 0,
                completionPercentage: profile.completionPercentage || 0,
                rewardsRedeemed: profile.rewardsRedeemed || 0,
            },
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

const getMyRewards = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Fetch logged-in volunteer
        const user = await User.findById(userId).select("name email profilePicture volunteerProfile").lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 2. Check volunteer profile
        const profile = user.volunteerProfile;

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
                user: {
                    name: user.name,
                    profilePicture: user.profilePicture?.url || null,
                },
            });
        }

        // 3. Count completed cleanup tasks
        const completedTasks = await CleanupTask.countDocuments({
            volunteer: userId,
            status: "Completed",
        });

        // 4. Calculate leaderboard rank
        const rank =
            (await User.countDocuments({
                "volunteerProfile.totalPointsEarned": {
                    $gt: profile.totalPointsEarned || 0,
                },
            })) + 1;

        // 5. Return contribution details
        return res.status(200).json({
            success: true,
            message: "Your contribution details fetched successfully",

            user: {
                name: user.name,
                profilePicture: user.profilePicture?.url || null,
            },

            rewards: {
                points: profile.points || 0,
                totalPointsEarned: profile.totalPointsEarned || 0,
                tasksAccepted: profile.tasksAccepted || 0,
                completedTasks,
                completionPercentage: profile.completionPercentage || 0,
                rewardsRedeemed: profile.rewardsRedeemed || 0,
                rank,
            },
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
