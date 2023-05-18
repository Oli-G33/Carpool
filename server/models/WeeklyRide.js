const mongoose = require('mongoose');
const User = require('./user');

const weeklyRideSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      default: mongoose.Types.ObjectId('645797f641f1b01e735339ae'),
      required: true
    },
    passengers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        date: {
          type: Date,
          required: true
        }
      }
    ],
    availableSeats: {
      type: Map,
      of: {
        type: Number,
        default: 4
      },
      default: function () {
        const seats = new Map();
        const startDate = new Date('05-15-2023');
        for (let i = 0; i < 5; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          seats.set(date.toISOString().slice(0, 10), 4);
        }
        return seats;
      },
      validate: {
        validator: function (seats) {
          // Iterate over each seat value and check if it's less than 0
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
