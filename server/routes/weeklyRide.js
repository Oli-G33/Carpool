const express = require('express');
const {
  getSeats,
  bookSeat,
  fetchPassengers,
  fetchMyRides,
  cancelMyRide
} = require('../controllers/weeklyRide');

const router = express.Router();

router.get('/myrides/:userId', fetchMyRides);
router.get('/dashboard/:date', fetchPassengers);
router.get('/availability/:date', getSeats);
router.post('/book', bookSeat);
router.post('/myrides/cancel', cancelMyRide);

module.exports = router;
