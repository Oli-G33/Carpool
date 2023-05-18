const express = require('express');
const router = express.Router();
const WeeklyRide = require('../models/WeeklyRide');
const { availableSeats } = require('../data');

const getSeats = async (req, res) => {
  const { date } = req.params;
  console.log(req.params);

  WeeklyRide.findOne(
    { [`availableSeats.${date}`]: { $exists: true } }, // match the document with the specified date
    { [`availableSeats.${date}`]: 1 } // project only the available seats for that date
  ).exec((err, ride) => {
    if (err) {
      res.status(503).json(err);
      console.error(err);
      // handle error
    } else if (!ride || availableSeats === undefined) {
      res.status(200).json(availableSeats.date);
      console.error(`No ride found for date ${date}`);
      // handle no ride found
    } else {
      const availableSeats = ride.availableSeats.get(date);
      res.status(200).json(availableSeats);
      console.log(
        `There are ${availableSeats} available seats for date ${date}`
      );
    }
  });
};

module.exports = { getSeats };
