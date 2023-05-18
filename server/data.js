const mongoose = require('mongoose');

const rideData = {
  driver: mongoose.Types.ObjectId('5f99205c8e2a3a00119a56e1'),
  passengers: [
    {
      user: mongoose.Types.ObjectId('5f9920c48e2a3a00119a56e2'),
      date: '05-16-2023'
    }
  ],
  availableSeats: {
    '29-05-2023': 4,
    '30-05-2023': 4,
    '31-05-2023': 4,
    '01-06-2023': 4,
    '02-06-2023': 4
  }
};

module.exports = rideData;
