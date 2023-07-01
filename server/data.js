const mongoose = require('mongoose');

const rideData = {
  driver: mongoose.Types.ObjectId('645797f641f1b01e735339ae'),
  passengers: [],
  availableSeats: new Map([
    ['2023-07-10', 4],
    ['2023-07-11', 4],
    ['2023-07-12', 4],
    ['2023-07-13', 4],
    ['2023-07-14', 4]
  ])
};

module.exports = rideData;
