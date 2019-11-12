const { Router } = require('express')
const User = require('./model')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const router = new Router()
const auth = require('../Auth/middleware')


router.post('/user', (req, res, next) => {
  console.log('testtest COMMING THROUGH!');
  
  const { email, password, username, firstName, lastName, status, score, classNumber } = req.body;
  
  if (email && password && username) {
    const user = {
      email,
      password: bcrypt.hashSync(password, 10),
      username,
      firstName,
      lastName,
      score,
      status,
      classNumber
    };
    User.findOne({
      where: { email },
      attributes: ['email'],
    })
      .then(result => {
        if (result) {
          res.status(400).send({ message: 'Email already in use' });
        }
      })
      .then(() => {
        return User.findOne({
          where: { username: { [Sequelize.Op.iLike]: username } },
          attributes: ['username'],
        });
      })
      .then(result => {
        if (result) {
          res.status(400).send({ message: 'Username already in use' });
        }
      })
      .then(() => {
        return User.create(user);
      })
      .then(() => {
        res.status(201).end();
      })
      .catch(console.error);
  } else {
    res.status(400).send({ message: 'Not all data provided' });
  }
 });

 router.get('/user', (req, res, next) => {
  const limit = req.query.per_page
  console.log("limit", limit)
  const page = parseInt(req.query.page)
  console.log("give me page ", page)
  const offset = limit * ( page-1 ) || 0
  console.log("offset", offset)
  User
  .findAndCountAll( {limit, offset})
  .then(user => {
  res.send(
  { 
  page: page,
  total: user.count,
  data: user
  }
  )})
  .catch(next)
  })

 module.exports = router;