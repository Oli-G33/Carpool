const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picture, phoneNumber } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picture,
      phoneNumber
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).lean();
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picture, phoneNumber } =
      req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);

    // Check if new data exists and update the corresponding fields
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }
    if (picture) {
      user.picture = picture;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    await User.findByIdAndUpdate(user._id, {
      $set: {
        resetToken: resetToken,
        resetTokenExpiration: Date.now() + 3600000
      }
    });

    await user.save();

    // Send password reset email to user with resetToken in the URL
    const resetUrl = `https://carpooler.onrender.com/reset-password/${resetToken}`;
    const msg = {
      to: user.email,
      from: 'Export-Carpooler@outlook.com', // Replace with your sending email address
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetUrl}`
    };
    await sgMail.send(msg);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the reset token and ensure it's valid and not expired
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decodedToken.userId,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() } // Token should not be expired
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired reset token' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(password, salt);

    // Update the user's password in the database
    user.password = newPasswordHash;
    user.resetToken = undefined; // Clear the reset token
    user.resetTokenExpiration = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { register, login, updateUser, resetPassword, forgotPassword };
