const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // 🔍 faster lookup
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 password never returned by default
    },

    role: {
      type: String,
      enum: ["farmer", "buyer", "admin"],
      default: "buyer",
    },

    location: {
      type: String,
      trim: true,
    },

    // 🔐 FORGOT PASSWORD
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ SAFE EXPORT (prevents OverwriteModelError)
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
