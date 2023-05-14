const mongoose = require('mongoose');

const rideData = {
  driver: mongoose.Types.ObjectId('5f99205c8e2a3a00119a56e1'),
  passengers: [
    {
      user: mongoose.Types.ObjectId('5f9920c48e2a3a00119a56e2'),
      date: '2023-05-16'
    }
  ],
  availableSeats: {
    '2023-05-15': 4,
    '2023-05-16': 3,
    '2023-05-17': 4,
    '2023-05-18': 4,
    '2023-05-19': 4
  }
};

module.exports = rideData;
