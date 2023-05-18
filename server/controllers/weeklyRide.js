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

const bookSeat = async (req, res) => {
  try {
    const { date } = req.body;

    // Find and update the WeeklyRide document for the specified date
    const ride = await WeeklyRide.findOneAndUpdate(
      { [`availableSeats.${date}`]: { $exists: true } }, // match the document with the specified date
      { $inc: { [`availableSeats.${date}`]: -1 } }, // decrement the available seats by 1
      { new: true } // return the updated document
    );

    if (!ride) {
      // No ride found for the date
      return res
        .status(404)
        .json({ message: `No ride found for date ${date}` });
    }

    // Get the updated available seats count
    const availableSeats = ride.availableSeats[date];

    // Return the updated available seats count
    res.json({ availableSeats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getSeats, bookSeat };
