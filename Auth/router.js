const { Router } = require('express');
const { toJWT, toData } = require('./jwt');
const Interviewee = require('../Interviewee/model');
const Admin = require('../Admin/model')
const bcrypt = require('bcrypt');
//const auth = require('./middleware');

const router = new Router();

router.post('/admin/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password',
    });
  } else {
    Admin.findOne({
      where: {
        email: email,
      },
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that email does not exist',
          });
        }
        else if (bcrypt.compareSync(password, entity.password)) {
          res.send({
            jwt: toJWT({ userId: entity.id }),
          });
        } else {
          res.status(400).send({
            message: 'Password was incorrect',
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: 'Something went wrong on the serverside',
        });
      });
    }
});

router.post('/interviewee/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password',
    });
  } else {
    Interviewee.findOne({
      where: {
        email: email,
      },
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that email does not exist',
          });
        }
        else if (bcrypt.compareSync(password, entity.password)) {
          res.send({
            jwt: toJWT({ userId: entity.id }),
          });
        } else {
          res.status(400).send({
            message: 'Password was incorrect',
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: 'Something went wrong on the serverside',
        });
      });
    }
});

module.exports = router;
