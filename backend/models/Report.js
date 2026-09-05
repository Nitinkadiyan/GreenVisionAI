const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
      // required: false,
    },
    imagePublicId: {
      type: String,
    },
    // videoUrl: {
    //   type: String,
    // },
    description: {
      type: String,
    },
    location: {
      latitude: Number,
      longitude: Number,
      address: String,
    },
    status: {
      default: "Pending Review",
      type: String,
      enum: [
        "Pending Review",
        "Approved",
        "Assigned",
        "Rejected",
        "In Progress",
        "Escalated",
        "Resolved",
      ],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    deadline: {
      type: Date,
    },
    assignedDepartment: {
      type: String,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedAt: {
      type: Date,
    },
    rewardAmount: {
      type: Number,
      default: 0,
    },
    rejectionReason: {
      type: String,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: {
      type: Date,
    },
    escalated: {
      type: Boolean,
      default: false,
    },
    escalatedTo: {
      type: String,
    },
    escalateReason: {
      type: String,
    },
    escalatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    escalatedAt: {
      type: Date,
    },
    aiAnalysis: {
      wasteType: {
        type: String,
      },
      confidence: {
        type: Number,
      },
      severity: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
      },
      estimateWasteKg: {
        type: Number,
      },
      environmentalRisk: {
        type: String,
      },
      possibleAction: {
        type: String,
      },
      suggestedAuthority: {
        type: String,
      },
      summary: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Report", reportSchema);
