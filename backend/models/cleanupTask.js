const mongoose = require("mongoose");

const cleanupTaskSchema = new mongoose.Schema(
    {
        // Report associated with this cleanup task
        report: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Report",
            required: true,
        },

        // Government officer who created/published this task
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
                "Rejected",
                "Cancelled",
            ],
            default: "Available",
        },

        // Volunteer assigned to this cleanup task
        volunteer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        completion: {
            // Before cleanup image
            beforeImageUrl: {
                type: String,
                default: null,
            },

            beforeImagePublicId: {
                type: String,
                default: null,
            },

            // After cleanup image
            afterImageUrl: {
                type: String,
                default: null,
            },

            afterImagePublicId: {
                type: String,
                default: null,
            },

            // Volunteer submission details
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

            // AI verification report
            aiVerification: {
                verified: {
                    type: Boolean,
                    default: null,
                },

                confidence: {
                    type: Number,
                    min: 0,
                    max: 1,
                    default: null,
                },

                cleanupQuality: {
                    type: String,
                    default: null,
                },

                sameLocation: {
                    type: Boolean,
                    default: null,
                },

                wasteReduced: {
                    type: Boolean,
                    default: null,
                },

                remainingWaste: {
                    type: String,
                    default: null,
                },

                evidenceMatchesDescription: {
                    type: Boolean,
                    default: null,
                },

                summary: {
                    type: String,
                    default: null,
                },

                recommendation: {
                    type: String,
                    enum: ["approve", "manual_review", "reject"],
                    default: null,
                },

                verifiedAt: {
                    type: Date,
                    default: null,
                },
            },

            // Government officer review details
            reviewReason: {
                type: String,
                default: null,
            },

            reviewedAt: {
                type: Date,
                default: null,
            },

            reviewedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: null,
            },

            reviewDecision: {
                type: String,
                enum: ["Approved", "Rejected", "Manual-Review"],
                default: null,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("CleanupTask", cleanupTaskSchema);
