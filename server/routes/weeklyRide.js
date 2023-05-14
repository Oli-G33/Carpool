const express = require('express');
const { getSeats } = require('../controllers/weeklyRide');

const router = express.Router();

router.get('/booking', getSeats);

module.exports = router;
