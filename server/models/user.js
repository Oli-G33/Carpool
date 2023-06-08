'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      max: 50
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      max: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      max: 50
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    picture: {
      type: String,
      default: '../assets/profilePic.png'
    },

    password: {
      type: String,
      required: true,
      min: 8
    },
    role: {
      type: String,
      enum: ['passenger', 'driver'],
      default: 'passenger'
    },
    isAdmin: {
      type: Boolean,
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
