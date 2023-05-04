const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  driver: { type: String, default: 'Oliver' },
  dateRange: {
    startDate: Date,
    endDate: Date
  },
  availableSeats: {
    '2023-03-07': 4,
    '2023-03-08': 4,
    '2023-03-09': 2,
    '2023-03-10': 0
  },
  bookings: [
    {
      user: String,
      numSeats: Number,
      date: '2023-03-07'
    }
  ]
});

const Bookings = mongoose.model('Bookings', schema);

module.exports = Bookings;
