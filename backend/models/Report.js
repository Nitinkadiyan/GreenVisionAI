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
        "Assignmed",
        "Rejected",
        "In Progress",
        "Escalated",
        "Resolved",
      ],
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Report", reportSchema);
