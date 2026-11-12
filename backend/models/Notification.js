const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "REPORT_SUBMITTED",
        "REPORT_APPROVED",
        "REPORT_REJECTED",
        "REPORT_RESOLVED",
        "CLEANUP_TASK_CREATED",
        "TASK_ACCEPTED",
        "TASK_ASSIGNED",
        "CLEANUP_SUBMITTED",
        "CLEANUP_APPROVED",
        "CLEANUP_REJECTED",
        "REWARD_CREDITED",
        "TASK_DEADLINE_APPROACHING",
        "TASK_OVERDUE",
        "SYSTEM",
      ],
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    relatedEntity: {
      entityType: {
        type: String,
        enum: ["Report", "CleanupTask", "Reward"],
        default: null,
      },

      entityId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Efficiently retrieve a user's latest notifications.
notificationSchema.index({
  recipient: 1,
  createdAt: -1,
});

// Efficiently count unread notifications.
notificationSchema.index({
  recipient: 1,
  isRead: 1,
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
