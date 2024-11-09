// backend/controller/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const JWT_SECRET = '5d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c592';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'momin.kashif81@gmail.com',
    pass: 'wtolnaukbsxlasnn',
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
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

    // Check if OTP is valid
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark user as verified and clear OTP fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if user is verified
    if (!user.isVerified) return res.status(400).json({ message: "Please verify your email first" });

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT with user ID and username
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Send back token and username
    res.status(200).json({ token, username: user.username, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, verifyOtp, login };
