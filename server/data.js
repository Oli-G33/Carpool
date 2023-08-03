const mongoose = require('mongoose');

const rideData = {
  driver: mongoose.Types.ObjectId('645797f641f1b01e735339ae'),
  passengers: [],
  availableSeats: new Map([
    ['2023-08-14', 4],
    ['2023-08-15', 4],
    ['2023-08-16', 4],
    ['2023-08-17', 0],
    ['2023-08-18', 0]
  ])
};

module.exports = rideData;
