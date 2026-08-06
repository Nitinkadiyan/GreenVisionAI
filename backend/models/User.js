const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  resetVerified:{
    type:Boolean,
    default:false,
  },
  otp:String,
  otpExpiry:Date,
});
userSchema.pre("save", async function () {
    console.log("Pre-save hook running");
    console.log("Before:", this.password);

    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);

    console.log("After:", this.password);

    
});
module.exports = mongoose.model("User", userSchema);
