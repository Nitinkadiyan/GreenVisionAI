const cleanupTask = require("../models/cleanupTask");
const CleanupTask = require("../models/cleanupTask");
const cloudinary = require("../utils/cloudinary.js");

const Report = require("../models/Report");
const {analyzeCleanup} = require("../services/VisionService");
const updateReportStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const {id} = req.params;

        const report = await Report.findByIdAndUpdate(id, {status}, {new: true});

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Report status updated successfully",
            report,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to update report status",
        });
    }
};
const createCleanupTask = async (req, res) => {
    try {
        const {report, reward, guideline, deadline} = req.body;
        if (!report || reward === undefined || !guideline || !deadline) {
            return res.json(400).json({
                success: false,
                message: "Report , reward , guideline and deadline not provided",
            });
        }
        const existingReport = await Report.findById(report);
        if (!existingReport) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }
        if (existingReport.status !== "Approved") {
            return res.status(400).json({
                success: false,
                message: "Only approved reports can be assigned for cleanup",
            });
        }
        const cleanupTask = await CleanupTask.create({
            report,
            reward: {
                amount: reward.amount,
            },
            guideline,
            deadline,
            status: "Available",
            volunteer: null,
        });
        return res.status(201).json({
            success: true,
            message: "Cleanup Task is created in mongoDb",
            cleanupTask,
        });
    } catch (error) {
        console.log(error);
        return res.json(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCleanuptasks = async (req, res) => {
    try {
        const cleanupTasks = await CleanupTask.find()
        .populate({
            path: "report",
            select: "imageUrl description location priority status aiAnalysis",
        })
        .populate({
            path: "volunteer",
            select: "name email",
        })
        .sort({
            createdAt: -1,
        });
        return res.status(200).json({
            success: true,
            count: cleanupTasks.length,
            cleanupTasks,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getLandingPageTasks = async (req, res) => {
    try {
        // Allow a maximum of 6 tasks on the landing page
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 3, 1), 6);

        const cleanupTasks = await CleanupTask.find({
            status: "Available",
        })
        .populate({
            path: "report",
            select: "description location priority imageUrl aiAnalysis",
        })
        .sort({createdAt: -1})
        .limit(limit)
        .lean();

        // Exclude tasks whose associated reports no longer exist
        const validTasks = cleanupTasks.filter((task) => task.report);

        return res.status(200).json({
            success: true,
            count: validTasks.length,
            cleanupTasks: validTasks,
        });
    } catch (error) {
        console.error("Landing Page Tasks Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch landing page tasks",
        });
    }
};
const getCleanupTaskById = async (req, res) => {
    try {
        const {id} = req.params;
        const cleanupTask = await CleanupTask.findById(id)
        .populate({path: "report", select: "images description"})
        .populate({
            path: "volunteer",
            select: "name email",
        });
        if (!cleanupTask) {
            return res.status(400).json({
                success: false,
                message: "Cleanup task not found",
            });
        }
        return res.status(200).json({
            success: true,
            cleanupTask,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateCleanupTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {reward, guideline, deadline, status} = req.body;
        const cleanupTask = await CleanupTask.findById(id);
        if (!cleanupTask) {
            return res.status(404).json({
                success: false,
                message: "not found",
            });
        }
        if (reward !== undefined) {
            cleanupTask.reward.amount = reward;
        }
        if (guideline !== undefined) {
            cleanupTask.guideline = guideline;
        }
        if (deadline !== undefined) {
            cleanupTask.deadline = deadline;
        }
        if (status !== undefined) {
            cleanupTask.status = status;
        }
        const updatedTask = await cleanupTask.save();
        return res.status(200).json({
            success: true,
            message: "cleanup task updated successfully",
            cleanupTask: updatedTask,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteCleanupTask = async (req, res) => {
    try {
        const {id} = req.params;
        const cleanupTask = await CleanupTask.findById(id);
        if (!cleanupTask) {
            return res.status(404).json({
                success: false,
                message: "Cleanup task not found",
            });
        }
        await CleanupTask.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "cleanup task successfully deleted",
        });
    } catch (error) {
        console.lof(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const mongoose = require("mongoose");
const User = require("../models/User");
const acceptCleanupTask = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const {id} = req.params;
        const userId = req.user.id;

        let acceptedTaskId = null;

        await session.withTransaction(async () => {
            // 1. Find logged-in user
            const user = await User.findById(userId).session(session);

            if (!user) {
                throw new Error("USER_NOT_FOUND");
            }

            // 2. Find cleanup task
            const existingTask = await CleanupTask.findById(id).session(session);

            if (!existingTask) {
                throw new Error("TASK_NOT_FOUND");
            }

            if (existingTask.status !== "Available") {
                throw new Error("TASK_NOT_AVAILABLE");
            }

            // 3. Check maximum five active tasks
            const activeStatuses = ["Assigned", "In-Progress", "Completion-Submitted", "Under-Review"];

            const activeTaskCount = await CleanupTask.countDocuments({
                volunteer: userId,
                status: {$in: activeStatuses},
            }).session(session);

            if (activeTaskCount >= 5) {
                throw new Error("TASK_LIMIT_REACHED");
            }

            // 4. Find associated report
            const report = await Report.findById(existingTask.report).session(session);

            if (!report) {
                throw new Error("REPORT_NOT_FOUND");
            }

            // 5. Prevent accepting own report
            if (userId.toString() === report.userId.toString()) {
                throw new Error("OWN_REPORT");
            }

            const cleanupTask = await CleanupTask.findOneAndUpdate(
                {
                    _id: id,
                    status: "Available",
                    volunteer: null,
                },
                {
                    $set: {
                        volunteer: userId,
                        status: "Assigned",
                    },
                },
                {
                    new: true,
                    session,
                    runValidators: true,
                }
            );

            if (!cleanupTask) {
                throw new Error("TASK_ALREADY_ACCEPTED");
            }

            if (!user.volunteerProfile) {
                user.volunteerProfile = {
                    points: 0,
                    tasksAccepted: 1,
                    completionPercentage: 0,
                    totalReportsWorked: 0,
                    rewardsRedeemed: 0,
                    totalPointsEarned: 0,
                    currentTask: null,
                    status: "working",
                };
            } else {
                user.volunteerProfile.tasksAccepted = (user.volunteerProfile.tasksAccepted || 0) + 1;

                user.volunteerProfile.status = "working";

                // Keep null because multiple active tasks are supported.
                user.volunteerProfile.currentTask = null;
            }

            await user.save({session});

            acceptedTaskId = cleanupTask._id;
        });

        // 8. Return task with populated volunteer details
        const cleanupTask = await CleanupTask.findById(acceptedTaskId).populate({
            path: "volunteer",
            select: "name profilePicture",
        });

        return res.status(200).json({
            success: true,
            message: "Cleanup task accepted successfully",
            cleanupTask,
        });
    } catch (error) {
        console.error("Accept Cleanup Task Error:", error);

        const errors = {
            USER_NOT_FOUND: [404, "User not found"],
            TASK_NOT_FOUND: [404, "Cleanup task not found"],
            TASK_NOT_AVAILABLE: [400, "This cleanup task is no longer available"],
            TASK_LIMIT_REACHED: [400, "You can accept a maximum of 5 active cleanup tasks."],
            REPORT_NOT_FOUND: [404, "Associated report not found"],
            OWN_REPORT: [403, "You cannot volunteer for a report you created."],
            TASK_ALREADY_ACCEPTED: [409, "This cleanup task has already been accepted."],
        };

        const [statusCode, message] = errors[error.message] || [500, "Failed to accept cleanup task"];

        return res.status(statusCode).json({
            success: false,
            message,
            ...(statusCode === 500 && {error: error.message}),
        });
    } finally {
        await session.endSession();
    }
};
const startCleanupTask = async (req, res) => {
    try {
        const {id} = req.params;
        const cleanupTask = await CleanupTask.findById(id);
        if (!cleanupTask) {
            return res.status(404).json({
                success: false,
                message: "Cleanup task not found",
            });
        }
        console.log("cleanupTask.volunteer:", cleanupTask.volunteer);
        console.log("string cleanupTask.volunteer:", cleanupTask.volunteer?.toString());
        console.log("req.user.id:", req.user.id);
        if (!cleanupTask.volunteer || cleanupTask.volunteer.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned this task",
            });
        }
        if (cleanupTask.status !== "Assigned") {
            return res.status(400).json({
                success: false,
                message: "Only an assigned task can be started",
            });
        }
        cleanupTask.status = "In-Progress";
        await cleanupTask.save();
        return res.status(200).json({
            success: true,
            message: "cleanupTask is now in progress",
            cleanupTask,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

const submitCleanupCompletion = async (req, res) => {
    let uploadedAfterImagePublicId = null;

    try {
        const {id} = req.params;
        const {description, latitude, longitude} = req.body;

        // 1. Validate description
        if (!description || !description.trim()) {
            return res.status(400).json({
                success: false,
                message: "Completion description is required",
            });
        }

        // 2. Get after image uploaded by volunteer
        const afterImage = req.files?.afterImage?.[0];

        if (!afterImage) {
            return res.status(400).json({
                success: false,
                message: "After-cleanup image is required",
            });
        }

        // 3. Find cleanup task
        const cleanupTask = await CleanupTask.findById(id);

        if (!cleanupTask) {
            return res.status(404).json({
                success: false,
                message: "Cleanup task not found",
            });
        }

        // 4. Verify volunteer assignment
        if (!cleanupTask.volunteer || cleanupTask.volunteer.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned this task",
            });
        }

        // 5. Verify task status
        if (cleanupTask.status !== "In-Progress") {
            return res.status(400).json({
                success: false,
                message: "Only in-progress tasks can be completed",
            });
        }

        // 6. Fetch original report
        const report = await Report.findById(cleanupTask.report);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Original report not found",
            });
        }

        // 7. Original report image becomes the before image
        const beforeImage = report.imageUrl;
        const beforeImagePublicId = report.imagePublicId;

        if (!beforeImage) {
            return res.status(400).json({
                success: false,
                message: "Original report image not found",
            });
        }

        // 8. Upload volunteer's after image to Cloudinary
        const afterImageUploaded = await cloudinary.uploader.upload(afterImage.path, {
            folder: "greenvision/cleanup-completions",
            resource_type: "image",
        });

        uploadedAfterImagePublicId = afterImageUploaded.public_id;

        const afterImageUrl = afterImageUploaded.secure_url;
        const afterImagePublicId = afterImageUploaded.public_id;

        // 9. Get original report AI analysis
        const analysis = report.aiAnalysis;

        // 10. Run AI cleanup verification

        const aiResult = await analyzeCleanup({
            beforeImage,
            afterImage: afterImageUrl,
            description: description.trim(),
            analysis: report.aiAnalysis,
        });
        if (!aiResult || typeof aiResult.verified !== "boolean") {
            throw new Error("Invalid AI verification response");
        }
        // 11. Prepare AI verification data
        const aiVerification = {
            verified: aiResult.verified,
            confidence: aiResult.confidence,
            cleanupQuality: aiResult.cleanupQuality,
            sameLocation: aiResult.sameLocation,
            wasteReduced: aiResult.wasteReduced,
            remainingWaste: aiResult.remainingWaste,
            evidenceMatchesDescription: aiResult.evidenceMatchesDescription,
            summary: aiResult.summary,
            recommendation: aiResult.recommendation,
            verifiedAt: aiResult.verifiedAt || new Date(),
        };

        // 12. Save completion evidence
        cleanupTask.completion.beforeImageUrl = beforeImage;
        cleanupTask.completion.beforeImagePublicId = beforeImagePublicId || null;

        cleanupTask.completion.afterImageUrl = afterImageUrl;
        cleanupTask.completion.afterImagePublicId = afterImagePublicId;

        cleanupTask.completion.description = description.trim();

        cleanupTask.completion.latitude = latitude !== undefined && latitude !== "" ? Number(latitude) : null;

        cleanupTask.completion.longitude = longitude !== undefined && longitude !== "" ? Number(longitude) : null;

        cleanupTask.completion.submittedAt = new Date();

        // 13. Save AI verification inside CleanupTask
        cleanupTask.completion.aiVerification = aiVerification;

        // 14. Update task status
        cleanupTask.status = "Completion-Submitted";

        // 15. Persist everything in MongoDB
        await cleanupTask.save();

        // 16. Send response
        return res.status(200).json({
            success: true,
            message: "Cleanup completion submitted successfully",
            cleanupTask,
        });
    } catch (error) {
        console.error("Cleanup completion submission error:", error);

        // Remove uploaded Cloudinary image if processing or saving fails
        if (uploadedAfterImagePublicId) {
            try {
                await cloudinary.uploader.destroy(uploadedAfterImagePublicId);
            } catch (cleanupError) {
                console.error("Failed to remove uploaded image:", cleanupError.message);
            }
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to submit cleanup completion",
        });
    }
};

module.exports = {
    submitCleanupCompletion,
};

const UnderReviewTask = async (req, res) => {
    try {
        const tasks = await CleanupTask.find({
            status: {$in: ["Completion-Submitted", "Under-Review"]},
        })
        .populate("report")
        .populate("volunteer", "name email profilePicture")
        .sort({"completion.submittedAt": -1});

        return res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        console.error("UnderReviewTask error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const completeCleanupTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {reason} = req.body;

        const task = await CleanupTask.findOneAndUpdate(
            {
                _id: id,
                status: {
                    $in: ["Completion-Submitted", "Under-Review"],
                },
            },
            {
                $set: {
                    status: "Completed",

                    "completion.reviewDecision": "Approved",
                    "completion.reviewReason": reason || null,
                    "completion.reviewedAt": new Date(),
                    "completion.reviewedBy": req.user?._id || req.user?.id || null,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        )
        .populate("report")
        .populate("volunteer", "name email")
        .populate("completion.reviewedBy", "name email");

        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task not found or it has already been reviewed.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cleanup task approved successfully.",
            task,
        });
    } catch (error) {
        console.error("completeCleanupTask error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Government officer sends the task for manual review.
const sendTaskForManualReview = async (req, res) => {
    try {
        const {id} = req.params;
        const {reason} = req.body;

        const task = await CleanupTask.findOneAndUpdate(
            {
                _id: id,
                status: "Completion-Submitted",
            },
            {
                $set: {
                    status: "Under-Review",
                },
            },
            {
                new: true,
                runValidators: true,
            }
        )
        .populate("report")
        .populate("volunteer", "name email");

        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task not found or it is no longer awaiting review.",
            });
        }

        return res.status(200).json({
            success: true,
            message: reason ? `Task moved to manual review: ${reason}` : "Task moved to manual review successfully.",
            task,
        });
    } catch (error) {
        console.error("sendTaskForManualReview error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Government officer rejects the submitted cleanup task.
const rejectCleanuptask = async (req, res) => {
    try {
        const {id} = req.params;
        const {reason} = req.body;

        if (!reason || !reason.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide a rejection reason.",
            });
        }

        const task = await CleanupTask.findOneAndUpdate(
            {
                _id: id,
                status: {$in: ["Completion-Submitted", "Under-Review"]},
            },
            {
                $set: {
                    status: "Rejected",
                    "completion.reviewReason": reason.trim(),
                    "completion.reviewedAt": new Date(),
                },
            },
            {
                new: true,
                runValidators: true,
            }
        )
        .populate("report")
        .populate("volunteer", "name email");

        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task not found or it cannot be rejected in its current status.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cleanup task rejected successfully.",
            task,
        });
    } catch (error) {
        console.error("rejectCleanuptask error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const releaseCleanupTask = async (req, res) => {
    try {
        const {id} = req.params;

        const cleanupTask = await CleanupTask.findById(id);

        if (!cleanupTask) {
            return res.status(404).json({
                success: false,
                message: "Cleanup task not found",
            });
        }

        // Only the assigned volunteer can release the task
        if (!cleanupTask.volunteer || cleanupTask.volunteer.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned this task",
            });
        }

        // Only assigned tasks can be released
        if (cleanupTask.status !== "Assigned") {
            return res.status(400).json({
                success: false,
                message: "Only accepted tasks can be released",
            });
        }

        cleanupTask.volunteer = null;
        cleanupTask.status = "Available";

        await cleanupTask.save();

        return res.status(200).json({
            success: true,
            message: "Task released successfully",
            cleanupTask,
        });
    } catch (error) {
        console.error("Release cleanup task error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
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
};
