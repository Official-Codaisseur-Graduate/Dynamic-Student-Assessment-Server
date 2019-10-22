const { Router } = require('express')
const User = require('./model')
const router = new Router()

router.post('/user', (req, res, next) => {

  const { email, password, username } = req.body;
  
  if (email && password && username) {
    const user = {
      email,
      password: bcrypt.hashSync(password, 10),
      username,
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

 module.exports = router;