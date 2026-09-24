const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    tasksAccepted: {
      type: Number,
      default: 0,
      min: 0,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    totalReportsWorked: {
      type: Number,
      default: 0,
      min: 0,
    },
    rewardsRedeemed: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPointsEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CleanupTask",
      default: null,
    },
    status: {
      type: String,
      enum: ["available", "working", "under-review"],
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Volunteer", volunteerSchema);
