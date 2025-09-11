const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./pass');

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });
};

module.exports = generateToken;
