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
    const desiredDate = new Date('2023-05-23'); // Example desired date

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
    const { passengerId: _id } = req.body;
    console.log(_id);

    // Find the ride in the database using the passengerId
    const ride = await WeeklyRide.findOne({
      'passengers._id': new ObjectId(_id)
    });

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found1' });
    }

    // Find the passenger in the ride's passengers array
    const passenger = ride.passengers.find(
      (passenger) => passenger._id.toString() === _id
    );

    if (!passenger) {
      return res
        .status(404)
        .json({ message: 'Passenger not found in the ride' });
    }

    const passengerId = passenger._id.toString();
    console.log(passengerId);

    // Get the date of the ride
    const rideDate = ride.passengers.find(
      (passenger) => passenger._id.toString() === _id
    ).date;

    // Add 1 seat to the availableSeats for the ride's date
    const updatedRide = await WeeklyRide.findOneAndUpdate(
      { 'availableSeats.date': rideDate },
      { $inc: { 'availableSeats.$.seats': 1 } },
      { new: true }
    );

    if (!updatedRide) {
      return res.status(404).json({ message: 'Ride not found2' });
    }

    // Remove the passenger from the ride
    updatedRide.passengers = updatedRide.passengers.filter(
      (passenger) => passenger._id.toString() !== _id
    );

    // Save the updated ride
    await updatedRide.save();

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
