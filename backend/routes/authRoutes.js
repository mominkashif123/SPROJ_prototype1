const express = require('express');
const { signup, login, verifyOtp, forgotPassword, verifyOtpForReset, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp); 
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-otp-for-reset', verifyOtpForReset);

module.exports = router;
  