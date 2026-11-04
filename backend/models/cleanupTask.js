const mongoose = require("mongoose");

const cleanupTaskSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },
    reward: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    guideline: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Available",
        "Assigned",
        "In-Progress",
        "Completion-Submitted",
        "Under-Review",
        "Completed",
        "Cancelled",
      ],
    },
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    completion: {
      beforeImageUrl: {
        type: String,
        default: null,
      },
      beforeImagePublicId: {
        type: String,
        default: null,
      },
      afterImageUrl: {
        type: String,
        default: null,
      },
      afterImagePublicId: {
        type: String,
        default: null,
      },
      description: {
        type: String,
        default: null,
      },
      latitude: {
        type: Number,
        default: null,
      },
      longitude: {
        type: Number,
        default: null,
      },
      submittedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("CleanupTask", cleanupTaskSchema);
