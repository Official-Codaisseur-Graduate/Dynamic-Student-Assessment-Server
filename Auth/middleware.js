const User = require('../Tables/User/model');

// Get user id back out from token
const { toData } = require('./jwt');

// Next() passes on the req || res object to the next step

function auth(req, res, next) {
  // get headers and split token from header
  const auth = req.headers.authorization && req.headers.authorization.split(' ');
  // check
  // console.log(auth);
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      // data is userId
      const data = toData(auth[1]);
      User.findByPk(data.userId)
        .then(user => {
          if (!user) return next('User does not exist');

          req.user = user;
          next();
        })
        .catch(next);
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      });
    }
  } else {
    res.status(401).send({
      message: 'Please supply some valid credentials',
    });
  }
}

module.exports = auth;
