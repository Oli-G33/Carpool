const mongoose = require('mongoose');

const rideData = {
  driver: mongoose.Types.ObjectId('645797f641f1b01e735339ae'),
  passengers: [],
  availableSeats: new Map([
    ['2023-06-19', 4],
    ['2023-06-20', 4],
    ['2023-06-21', 4],
    ['2023-06-22', 4],
    ['2023-06-23', 4]
  ])
};

module.exports = rideData;
