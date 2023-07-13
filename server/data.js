const mongoose = require('mongoose');

const rideData = {
  driver: mongoose.Types.ObjectId('645797f641f1b01e735339ae'),
  passengers: [],
  availableSeats: new Map([
    ['2023-07-24', 4],
    ['2023-07-25', 4],
    ['2023-07-26', 4],
    ['2023-07-27', 4],
    ['2023-07-28', 4]
  ])
};

module.exports = rideData;
