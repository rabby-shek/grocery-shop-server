import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    passwordHashed: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    otp: {
      type: String,       // store OTP code
      default: null,
    },

    otpExpiresAt: {
      type: Date,         // expiry time
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,     // user must verify OTP first
    },
    token: {
      type: String,
      default: null
    },
    isBanned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
