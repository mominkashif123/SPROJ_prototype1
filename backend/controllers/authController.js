const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const JWT_SECRET = '5d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c592';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'dadacambridge01@gmail.com',
    pass: 'vduyyjrudluskfbd',
  },
});

const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: 'dadacambridge@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
  };
  await transporter.sendMail(mailOptions);
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user',
      otp,
      otpExpires,
      isVerified: false,
    });

    await newUser.save();
    await sendOtp(email, otp);

    res.status(201).json({ message: "User registered successfully. Please verify your email with the OTP sent." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified) return res.status(400).json({ message: "User already verified" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified) return res.status(400).json({ message: "Please verify your email first" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, username: user.username, role: user.role, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOtp(email, otp);

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOtpForReset = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified. You can now reset your password." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    // console.log("Received reset password request:", req.body);

    // Validate that both fields exist
    if (!email || !newPassword) {
      // console.log("Missing fields:", { email, newPassword });
      return res.status(400).json({ message: "Email and new password are required" });
    }

    // Validate new password with regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPassword)) {
      // console.log("Password does not meet requirements");
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long.",
      });
    }

    // Find user and update password
    const user = await User.findOne({ email });
    // console.log("User found:", user);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP fields
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();
    // console.log("Password reset successfully for user:", email);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "An error occurred while resetting password" });
  }
};



module.exports = { signup, verifyOtp, login, forgotPassword, verifyOtpForReset, resetPassword };
