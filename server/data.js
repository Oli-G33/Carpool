const mongoose = require('mongoose');

const rideData = {
  driver: mongoose.Types.ObjectId('645797f641f1b01e735339ae'),
  passengers: [
    {
      user: mongoose.Types.ObjectId('60a1acdfaa30e65461c2d05d'),
      date: '2023-05-09T00:00:00.000Z'
    },
    {
      user: mongoose.Types.ObjectId('60a1acdfaa30e65461c2d05e'),
      date: '2023-05-10T00:00:00.000Z'
    }
  ],
  availableSeats: {
    '2023-05-09': 2,
    '2023-05-10': 3,
    '2023-05-11': 4,
    '2023-05-12': 4,
    '2023-05-13': 4
  }
};

module.exports = rideData;
