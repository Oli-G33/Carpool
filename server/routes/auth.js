const express = require('express');
const {
  login,
  register,
  updateUser,
  resetPassword,
  forgotPassword
} = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.patch('/update/:id', updateUser);

module.exports = router;
