const mongoose = require('mongoose');
const User = require('./user');

const weeklyRideSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      enum: ['648189ae50ce4d80bbf6fba4', '64a8176b97a9b10bb6fca106'],
      default: '648189ae50ce4d80bbf6fba4',
      required: true
    },
    status: {
      type: [
        {
          type: String,
          enum: ['pending', 'confirmed']
        }
      ],
      default: ['pending']
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
        }
      }
    ],
    location: {
      type: String
    },
    pickupTime: {
      type: String
    },
    availableSeats: {
      type: Map,
      of: {
        type: Number,
        default: 4,
        max: 4
      },
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
