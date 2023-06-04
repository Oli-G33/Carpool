const mongoose = require('mongoose');

const rideData = {
  driver: mongoose.Types.ObjectId('645797f641f1b01e735339ae'),
  passengers: [],
  availableSeats: new Map([
    ['2023-06-05', 4],
    ['2023-06-06', 4],
    ['2023-06-07', 4],
    ['2023-06-08', 4],
    ['2023-06-09', 4]
  ])
};

module.exports = rideData;
