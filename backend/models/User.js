const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Volunteer profile schema
const volunteerProfileSchema = new mongoose.Schema(
    {
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
        _id: false,
    }
);

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    name: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        trim: true,
    },

    isPhoneVerified: {
        type: Boolean,
        default: false,
    },

    location: {
        city: {
            type: String,
            trim: true,
        },
        area: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },

    profilePicture: {
        url: {
            type: String,
        },
        publicId: {
            type: String,
        },
    },

    password: {
        type: String,
        required: function () {
            return this.authProvider === "local";
        },
    },

    confirmPassword: {
        type: String,
        required: function () {
            return this.authProvider === "local";
        },
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    accessCode: {
        type: String,
        trim: true,
    },

    otp: {
        type: String,
    },

    otpExpiry: {
        type: Date,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    resetVerified: {
        type: Boolean,
        default: false,
    },

    role: {
        type: String,
        enum: ["government", "citizen"],
        default: "citizen",
    },

    authProvider: {
        type: String,
        enum: ["local", "google", "facebook"],
        default: "local",
    },

    googleId: {
        type: String,
        sparse: true,
        unique: true,
    },

    facebookId: {
        type: String,
        sparse: true,
        unique: true,
    },

    // Volunteer profile is created only when the user
    // accepts their first cleanup task.
    volunteerProfile: {
        type: volunteerProfileSchema,
        default: null,
    },
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
