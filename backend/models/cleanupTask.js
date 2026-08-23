const mongoose = require("mongoose");

const cleanupTaskSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      requiered: true,
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
      require: true,
    },
    status: {
      type: String,
      enum: [
        "available",
        "assigned",
        "in-progress",
        "completion-submitted",
        "under-review",
        "completed",
        "cancelled",
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
      },
      afterImageUrl: {
        type: String,
        default: null,
      },
      afterImagePublicId: {
        type: String,
      },
      description: {
        type: String,
        default: null,
      },
      submittedAt: {
        type: Date,
        default: null,
      },
      aiVerification: {
        verified: {
          type: String,
        },
        confidence: {
          type: String,
        },
        cleanupQuality: {
          type: String,
        },
        sameLocation: {
          type: String,
        },
        wasteReduced: {
          type: String,
        },
        remainingWaste: {
          type: String,
        },
        evidenceMatchesDescription: {
          type: String,
        },
        summary: {
          type: String,
        },
        recommendation: {
          type: String,
        },
        verifiedAt: {
          type: Date,
        },
      },
    },
  },     
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("CleanupTask", cleanupTaskSchema);
