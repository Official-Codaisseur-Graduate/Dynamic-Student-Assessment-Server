const { Router } = require('express')
const UserAnswer = require('./model')
const router = new Router()

router.post('/userAnswers', async (req, res, next) => {
  const userAnswer = await UserAnswer.create(req.body)
  const updatedUserAnswer = await UserAnswer.findByPk(userAnswer.id,
    {
      include: [{
        model: Answer,
        attributes: ['correct']
    }]})    
  res.send(updatedUserAnswer)
  // .catch(next)
})

router.get('/userAnswers', (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0

  UserAnswer
  .findAll({limit, offset})
  .then(userAnswers => res.send(userAnswers))
  .catch(next)
})

router.get('/userAnswer', (req, res, next) => {
  UserAnswer
  .findByPk(req.params.id)
  .then(userAnswer => res.send(userAnswer))
  .catch(next)
})

router.put('/userAnswer', (req, res, next) => {
  UserAnswer
  .findByPk(req.params.id)
  .then(userAnswer => res.send(userAnswer))
  .then(userAnswer => res.status(201).send(userAnswer))
  .catch(next)
})

module.exports = router;