import User from "../models/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcrypt";


// -------------------------------
// REGISTER: SEND OTP
// -------------------------------
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const otp = generateOtp();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    const user = await User.create({
      username,
      email,
      password: hashed,
      otp,
      otpExpiresAt: otpExpiry,
    });

    // Send OTP
    await sendEmail(
      email,
      "Your OTP Code",
      `<h1>Your OTP is ${otp}</h1><p>Valid for 5 minutes.</p>`
    );

    res.json({ message: "OTP sent to email", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// -------------------------------
// VERIFY OTP
// -------------------------------
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "Invalid user" });

    if (user.otp !== otp)
      return res.status(400).json({ message: "Incorrect OTP" });

    if (user.otpExpiresAt < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// -------------------------------
// RESEND OTP
// -------------------------------
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = generateOtp();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    user.otp = otp;
    user.otpExpiresAt = otpExpiry;
    await user.save();

    await sendEmail(
      email,
      "Your New OTP Code",
      `<h1>Your new OTP is ${otp}</h1>`
    );

    res.json({ message: "New OTP sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// -------------------------------
// LOGIN (Only if Verified)
// -------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Verify OTP first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
