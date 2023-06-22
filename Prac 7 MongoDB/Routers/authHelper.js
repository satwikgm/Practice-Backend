const jwt = require('jsonwebtoken');
// Random secret key stored in backend
const JWT_KEY = require('../../secrets');


module.exports = protectRoute;