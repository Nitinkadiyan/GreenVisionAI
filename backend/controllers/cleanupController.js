const cleanupTask = require("../models/cleanupTask");
const CleanupTask = require("../models/cleanupTask");
const Report = require("../models/Report");
const createCleanupTask = async (req, res) => {
  try {
    const { report, reward, guideline, deadline } = req.body;
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
        amount: reward,
      },
      guideline,
      deadline,
      status: "available",
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
    const cleanupTasks = await CleanupTask.find({
      status: "available",
    })
      .populate({
        path: "report",
        select: "image description",
      })
      .populate({
        path: "volunteer",
        select: "username email",
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
const getCleanupTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const cleanupTask = await CleanupTask.findById(id)
      .populate({ path: "report", select: "images description" })
      .populate({
        path: "volunteer",
        select: "username email",
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
    const { id } = req.params;
    const { reward, guideline, deadline, status } = req.body;
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
    const { id } = req.params;
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
const acceptCleanupTask = async (req, res) => {
  try {
    const { id } = req.params;

    const cleanupTask = await CleanupTask.findById(id);

    if (!cleanupTask) {
      return res.status(404).json({
        success: false,
        message: "Cleanup task not found",
      });
    }

    // Task must still be available
    if (cleanupTask.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "This cleanup task is no longer available",
      });
    }

    // Get the currently logged-in citizen
    const userId = req.user.id;

    // Assign the task to that user
    cleanupTask.volunteer = userId;

    // Change status
    cleanupTask.status = "assigned";

    await cleanupTask.save();

    return res.status(200).json({
      success: true,
      message: "Cleanup task accepted successfully",
      cleanupTask,
    });
  } catch (error) {
    console.error("Accept Cleanup Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to accept cleanup task",
      error: error.message,
    });
  }
};
const startCleanupTask = async (req, res) => {
  try {
    const { id } = req.params;
    const cleanupTask = await CleanupTask.findById(id);
    if (!cleanupTask) {
      return res.status(404).json({
        success: false,
        message: "Cleanup task not found",
      });
    }
    if (
      !cleanupTask.volunteer ||
      cleanupTask.volunteer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned this task",
      });
    }
    if (cleanupTask.status !== "assigned") {
      return res.status(400).json({
        success: false,
        message: "Only an assigned task can be started",
      });
    }
    cleanupTask.status = "in-progress";
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
  try {
    const { id } = req.params;
    const { description } = req.body;
    const cleanupTask = await CleanupTask.findById(id);
    if (!cleanupTask) {
      return res.status(404).json({
        success: false,
        message: "Cleanup task not found",
      });
    }
    if (
      !cleanupTask.volunteer ||
      cleanupTask.volunteer.toString() !== req.user.id
    ) {
      return res.status(400).json({
        success: false,
        message: "You are not assigned this task",
      });
    }
    if (cleanupTask.status !== "in-progress") {
      return res.status(400).json({
        success: false,
        message: "Only in-progress task can be completed",
      });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Completion description is required",
      });
    }
    cleanupTask.completion.description = description;
    cleanupTask.status = "completion-submitted";
    await cleanupTask.save();
    return res.status(200).json({
      success: true,
      message: "cleanup completion submitted successfully",
      cleanupTask,
    });
  } catch (error) {
    console.log(error);
    return res.json(500).json({
      message: error.message,
      success: false,
    });
  }
};
const UnderReviewTask = async (req, res) => {
  try {
    const tasks = await CleanupTask.find({
      status: "completion-submitted",
    })
      .populate("report")
      .populate("volunteer", "username email")
      .sort({ "completion.submittedAt": -1 });
    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const completeCleanupTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await cleanupTask.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Cleanup task not found",
      });
    }
    if (task.status !== "completion-submitted") {
      return res.status(400).json({
        success: false,
        message: "Task is not under-review",
      });
    }
    task.status = "completed";
    await task.save();
    return res.status(200).json({
      success: true,
      message: "Cleanup task is finally completed",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const rejectCleanuptask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await cleanupTask.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Cleanup task not found",
      });
    }
    console.log(task.status);
    if (task.status !== "completion-submitted") {
      return res.status(400).json({
        success: false,
        message: "Task is not under-review",
      });
    }
    task.status = "rejected";
    await task.save();
    return res.status(200).json({
      success: true,
      message: "Cleanup task is rejected",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
module.exports = {
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
};
