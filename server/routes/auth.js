const express = require('express');
const { login, register, updateUser } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/update/:id', updateUser);

module.exports = router;
