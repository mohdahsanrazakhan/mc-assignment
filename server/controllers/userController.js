const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  const otpExpiry = Date.now() + 3600000; // OTP expires in 1 hour

  try {
    console.log('Request Body:', req.body);

    // Save user with OTP and otpExpiry
    const user = await User.create({ username, email, password, otp, otpExpiry });

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Your OTP for verification is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email', details: error.message });
      }
      console.log('Email sent: ', info.response);
      res.status(200).json({ message: 'Signup successful, OTP sent', userId: user.id });
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'Error during signup', details: err.message });
  }
};


exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // OTP is correct, proceed with signup
    user.otp = null; // Clear OTP
    user.otpExpiry = null; // Clear OTP expiry
    await user.save();
    
    res.status(200).json({ message: 'Email verified, signup complete' });
  } catch (err) {
    console.error('Error during OTP verification:', err);
    res.status(500).json({ error: 'Error verifying OTP', details: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
