const express = require('express');
const router = express.Router();
const WeeklyRide = require('../models/WeeklyRide');
const { availableSeats } = require('../data');
const User = require('../models/user');
const { ObjectId } = require('mongodb');

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

const fetchPassengers = async (req, res) => {
  try {
    const desiredDate = new Date('2023-05-23');

    // Query the WeeklyRide collection for a specific date's passengers
    const ride = await WeeklyRide.findOne(
      { 'passengers.date': desiredDate },
      'passengers'
    );

    if (!ride) {
      // Handle case where no ride with passengers for the desired date is found
      return res.status(404).json({ message: 'No ride found for the date' });
    }

    const passengerIds = ride.passengers.map((passenger) => passenger.userId);

    // Query the Users collection to get the user documents for the passengerIds
    const passengers = await User.find(
      { _id: { $in: passengerIds } },
      'firstName lastName'
    );

    res.json(passengers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const fetchMyRides = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Query the WeeklyRide collection for rides where the user is a passenger
    const rides = await WeeklyRide.find({ 'passengers.userId': userId });

    // Extract the dates and passenger IDs where the user is a passenger
    const passengerData = rides.reduce((result, ride) => {
      const passengerDates = ride.passengers
        .filter((passenger) => passenger.userId.toString() === userId)
        .map((passenger) => ({
          date: passenger.date,
          passengerId: passenger._id
        }));
      return [...result, ...passengerDates];
    }, []);

    res.json(passengerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const cancelMyRide = async (req, res) => {
  try {
    const { passengerId: _id, date } = req.body;

    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log('Here=> ', formattedDate);

    // Find the ride in the database using the passengerId
    const ride = await WeeklyRide.findOne({
      'passengers._id': new ObjectId(_id)
    });

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found1' });
    }

    // Find the passenger index in the ride's passengers array
    const passengerIndex = ride.passengers.findIndex(
      (passenger) => passenger._id.toString() === _id
    );

    if (passengerIndex === -1) {
      return res
        .status(404)
        .json({ message: 'Passenger not found in the ride' });
    }

    // Remove the passenger from the ride's passengers array
    ride.passengers.splice(passengerIndex, 1);

    const query = {};
    query[`availableSeats.${formattedDate}`] = { $exists: true };

    const update = {};
    update[`availableSeats.${formattedDate}`] = 1;

    const updatedRide = await ride.save();

    if (!updatedRide) {
      return res.status(404).json({ message: 'Ride not found2' });
    }

    // Update the available seats
    await WeeklyRide.findOneAndUpdate(query, { $inc: update }, { new: true });

    res.json({ message: 'Ride canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getSeats,
  bookSeat,
  fetchPassengers,
  fetchMyRides,
  cancelMyRide
};
