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
      afterImageUrl: {
        type: String,
        default: null,
      },
      description:{
        type:String,
        default:null,
      },
      submittedAt:{
        type:Date,
        default:null,
      }
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("CleanupTask", cleanupTaskSchema);
