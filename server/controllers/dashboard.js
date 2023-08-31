const WeeklyRide = require('../models/WeeklyRide');
const User = require('../models/user');

const uploadRides = async (req, res) => {
  try {
    const ridesData = req.body;
    console.log(ridesData);

    const weeklyRides = await WeeklyRide.create(ridesData);

    res.status(201).json(weeklyRides);
    console.log(weeklyRides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadRides };
