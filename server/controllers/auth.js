const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picture, phoneNumber } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picture,
      phoneNumber
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).lean();
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });
    console.log({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picture, phoneNumber } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedUserInfo = {
      firstName,
      lastName,
      email,
      password: passwordHash,
      picture,
      phoneNumber
    };

    // Assuming you have the user's ID available in the request
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserInfo, {
      new: true
    });

    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, updateUser };
