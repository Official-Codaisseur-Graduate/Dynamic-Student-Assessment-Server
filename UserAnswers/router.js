const { Router } = require('express')
const UserAnswer = require('./model')
const router = new Router()

router.post('/userAnswer', (req, res, next) => {
  UserAnswer
  .create(req.body)
  .then(userAnswers => res.send(userAnswers))
  .catch(next)
})

router.get('/userAnswer', (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0

  UserAnswer
  .findAll({limit, offset})
  .then(userAnswers => res.send(userAnswers))
  .catch(next)
})

router.get('/userAnswer/:id', (req, res, next) => {
  UserAnswer
  .findByPk(req.params.id)
  .then(userAnswer => res.send(userAnswer))
  .catch(next)
})

router.put('/userAnswer/:id', (req, res, next) => {
  UserAnswer
  .findByPk(req.params.id)
  .then(userAnswer => res.send(userAnswer))
  .then(userAnswer => res.status(201).send(userAnswer))
  .catch(next)
})

module.exports = router;