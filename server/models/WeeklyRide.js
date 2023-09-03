const mongoose = require('mongoose');
const User = require('./user');

const weeklyRideSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    passengers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        date: {
          type: Date,
          required: true
        },
        location: {
          type: String
        },
        pickupTime: {
          type: String
        },
        status: {
          type: String,
          enum: ['confirmed', 'pending'],
          default: 'pending'
        }
      }
    ],

    shifts: {
      type: Map,
      of: String,
      default: function () {
        const shifts = new Map();
        const startDate = new Date('21-05-2023');
        for (let i = 0; i < 5; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          shifts.set(date.toISOString().slice(0, 10), '');
        }
        return shifts;
      }
    },

    availableSeats: {
      type: Map,
      of: Number,
      default: function () {
        const seats = new Map();
        const startDate = new Date('21-05-2023');
        for (let i = 0; i < 5; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          seats.set(date.toISOString().slice(0, 10), 4);
        }
        return seats;
      },
      validate: {
        validator: function (seats) {
          for (const value of seats.values()) {
            if (value < 0) {
              return false;
            }
          }
          return true;
        },
        message: 'Available seats cannot be negative'
      }
    }
  },
  { timestamps: true }
);

const WeeklyRide = mongoose.model('WeeklyRide', weeklyRideSchema);

module.exports = WeeklyRide;
