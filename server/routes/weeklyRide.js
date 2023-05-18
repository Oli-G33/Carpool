const express = require('express');
const { getSeats, bookSeat } = require('../controllers/weeklyRide');

const router = express.Router();

router.get('/:date', getSeats);
router.post('/book', bookSeat);

module.exports = router;
