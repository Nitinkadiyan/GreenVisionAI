const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    default: new Date(),
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
  // {
  //   timestamps: true,
  // },

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
  // otp: String,
  // otpExpiry: Date,
});
userSchema.pre("save", async function () {
  // console.log("Pre-save hook running");
  // console.log("Before:", this.password);

  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);

  // console.log("After:", this.password);
});
module.exports = mongoose.model("User", userSchema);
