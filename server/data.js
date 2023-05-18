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
    '22-05-2023': 4,
    '23-05-2023': 3,
    '24-05-2023': 4,
    '25-05-2023': 4,
    '26-05-2023': 4
  }
};

module.exports = rideData;
