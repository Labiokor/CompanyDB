const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { jwtSecret } = require('./pass');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  res.status(401).json({ message: 'No token, authorization denied' });
};

module.exports = protect;
