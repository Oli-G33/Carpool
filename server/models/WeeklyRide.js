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
      '2023-05-09': { type: Number, default: 4 },
      '2023-05-10': { type: Number, default: 4 },
      '2023-05-11': { type: Number, default: 4 },
      '2023-05-12': { type: Number, default: 4 },
      '2023-05-13': { type: Number, default: 4 }
    }
  },
  { timestamps: true }
);

const WeeklyRide = mongoose.model('WeeklyRide', weeklyRideSchema);

module.exports = WeeklyRide;
