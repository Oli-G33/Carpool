const express = require('express');
const { uploadRides } = require('../controllers/dashboard');

const router = express.Router();

router.post('/upload-rides', uploadRides);

module.exports = router;
