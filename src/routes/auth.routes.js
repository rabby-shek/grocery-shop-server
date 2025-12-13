import express from "express";
import { register, verifyOtp, resendOtp, login, getUserById, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.get("/user/:id", getUserById);
router.post("/logout", logout);
export default router;
