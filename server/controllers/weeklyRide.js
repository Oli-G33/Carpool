const express = require('express');
const router = express.Router();
const WeeklyRide = require('../models/WeeklyRide');

const getSeats = async (req, res) => {
  res.send('hello world');
  //   const { date } = req.params.date;

  //   WeeklyRide.findOne(
  //     { [`availableSeats.${date}`]: { $exists: true } }, // match the document with the specified date
  //     { [`availableSeats.${date}`]: 1 } // project only the available seats for that date
  //   ).exec((err, ride) => {
  //     if (err) {
  //       console.error(err);
  //       // handle error
  //     } else if (!ride) {
  //       console.error(`No ride found for date ${date}`);
  //       // handle no ride found
  //     } else {
  //       const availableSeats = ride.availableSeats.get(date);
  //       console.log(
  //         `There are ${availableSeats} available seats for date ${date}`
  //       );
  //       // display available seats
  //     }
  //   });
};

module.exports = { getSeats };
