require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  // get token from header
  const token = req.header('auth-token');

  // check if there's no token
  if (!token) return res.status(401).send('authorization denied');

  // verify the token
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).send('invalid token');
  }
}


module.exports = {auth};
