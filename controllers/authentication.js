
const bcrypt = require('bcryptjs');
const generateToken = require('../generateToken');
const User = require('../models/users');
const pass = require('../pass');


exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ where: {email} });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const harshedPassword = await bcrypt.hash(password, 10); 

    const user = await User.create({ name, email, password: harshedPassword });
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
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
    const user = await User.findOne({ where: {email} });
     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

   const token = generateToken(user.id);
   res.status(200).json({ message: 'Login successful', token });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // return user info 
    res.json({
      message: 'Login successful',
      id: user.id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (err) {
    next(err);
  }
};