const express = require('express');
const {
  getSeats,
  bookSeat,
  fetchPassengers
} = require('../controllers/weeklyRide');

const router = express.Router();

router.get('/:date', getSeats);
router.get('/dashboard/:date', fetchPassengers);
router.post('/book', bookSeat);

module.exports = router;
