const express = require('express');
const router = express.Router();
const WeeklyRide = require('../models/WeeklyRide');
const { availableSeats } = require('../data');

const getSeats = async (req, res) => {
  const { date } = req.params;
  console.log('Here===>', date);
  const formattedDate = date.split('-').reverse().join('-');
  console.log(formattedDate);

  WeeklyRide.findOne(
    { [`availableSeats.${formattedDate}`]: { $exists: true } }, // match the document with the specified date
    { [`availableSeats.${formattedDate}`]: 1 } // project only the available seats for that date
  ).exec((err, ride) => {
    if (err) {
      res.status(503).json(err);
      console.error(err);
      // handle error
    } else if (!ride || availableSeats === undefined) {
      res.status(200).json(availableSeats.formattedDate);
      console.error(`No ride found for date ${formattedDate}`);
      // handle no ride found
    } else {
      const availableSeats = ride.availableSeats.get(formattedDate);
      res.status(200).json(availableSeats);
      console.log(
        `There are ${availableSeats} available seats for date ${formattedDate}`
      );
    }
  });
};

const bookSeat = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const formattedDate = date.split('-').reverse().join('-');

    // Find and update the WeeklyRide document for the specified date
    const ride = await WeeklyRide.findOneAndUpdate(
      { [`availableSeats.${formattedDate}`]: { $exists: true } },
      {
        $inc: { [`availableSeats.${formattedDate}`]: -1 },
        $push: { passengers: { userId, date: formattedDate } }
      },
      { new: true }
    );

    if (!ride) {
      // No ride found for the date
      return res
        .status(404)
        .json({ message: `No ride found for date ${formattedDate}` });
    }

    // Get the updated available seats count
    const availableSeats = ride.availableSeats[formattedDate];

    // Return the updated available seats count
    res.json({ availableSeats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getSeats, bookSeat };
