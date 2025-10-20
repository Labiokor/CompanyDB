const bcrypt = require('bcryptjs');
const generateToken = require('../generateToken');
const User = require('../models/users');
const pass = require('../pass');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password});
    res.status(201).json({
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(' Registration error:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await user.validatePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user.id);

    // return user info
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
