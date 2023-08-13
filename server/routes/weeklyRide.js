const express = require('express');
const {
  getSeats,
  bookSeat,
  fetchPassengers,
  fetchMyRides,
  cancelMyRide,
  getPendingPassengers,
  confirmRide
} = require('../controllers/weeklyRide');

const router = express.Router();

router.get('/myrides/:userId', fetchMyRides);
router.get('/dashboard/:date', fetchPassengers);
router.get('/availability/:date', getSeats);
router.get('/pending-rides/:id', getPendingPassengers);
router.post('/book', bookSeat);
router.post('/myrides/cancel', cancelMyRide);
router.post('/confirm-ride', confirmRide);

module.exports = router;
