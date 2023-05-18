const express = require('express');
const { getSeats } = require('../controllers/weeklyRide');

const router = express.Router();

router.get('/:date', getSeats);

module.exports = router;
