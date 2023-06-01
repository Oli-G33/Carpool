'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    picture: {
      type: String
      // default: '../assets/profilePic.png'
    },

    password: {
      type: String
    },
    role: {
      type: String,
      enum: ['passenger', 'driver'],
      default: 'passenger'
    },
    isAdmin: {
      type: String,
      default: false
    }
  },
  { timestamps: true }
);

schema.pre('save', function (next) {
  this.firstName =
    this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
  this.lastName =
    this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);
  next();
});

const User = mongoose.model('User', schema);

module.exports = User;
