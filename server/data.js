const mongoose = require('mongoose');

const rideData = {
  driver: mongoose.Types.ObjectId('645797f641f1b01e735339ae'),
  passengers: [],
  availableSeats: new Map([
    ['2023-07-03', 4],
    ['2023-07-04', 4],
    ['2023-07-05', 4],
    ['2023-07-06', 4],
    ['2023-07-07', 4]
  ])
};

module.exports = rideData;
