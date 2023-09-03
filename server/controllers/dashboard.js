const WeeklyRide = require('../models/WeeklyRide');
const User = require('../models/user');

const uploadRides = async (req, res) => {
  try {
    const ridesData = req.body;
    const driverId = ridesData.driver;

    // Build a dynamic query object for matching date keys in availableSeats
    const dateQuery = {};
    if (ridesData.availableSeats) {
      Object.keys(ridesData.availableSeats).forEach((date) => {
        dateQuery[`availableSeats.${date}`] = { $exists: true };
      });
    }

    // Check if there is an existing document for the same driver and matching dates in availableSeats
    const existingRide = await WeeklyRide.findOne({
      driver: driverId,
      ...dateQuery
    });

    if (existingRide) {
      // If an existing document is found, update availableSeats and shifts
      if (ridesData.availableSeats) {
        existingRide.availableSeats = ridesData.availableSeats;
      }
      if (ridesData.shifts) {
        existingRide.shifts = ridesData.shifts;
      }
      console.log('Ride updated');
      await existingRide.save();

      res.status(200).json(existingRide);
    } else {
      // If no existing document is found, create a new one
      const weeklyRides = await WeeklyRide.create(ridesData);
      console.log('Ride created');
      res.status(201).json(weeklyRides);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadRides };
