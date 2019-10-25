const { Router } = require('express')
const UserAnswer = require('./model')
const router = new Router()

router.post('/userAnswer', async (req, res, next) => {
  try {
    const UserAnswer = await UserAnswer.create({
      userId: req.body.user.userId,
      questionId: req.body.answer.questionId,
      categoryId: req.body.answer.categoryId,
    })
    res.send(UserAnswer)
  }
  catch(error) {
    console.error(error)
  }
})

router.put('/userAnswer/:id', async (req, res, next) => {
  try {
    const UserAnswer = await UserAnswer.findByPk(req.params.id)
    const updatedAnswer = await UserAnswer.update({
      correct: req.body.answer.correct
    })
    res.send(updatedAnswer)
  }
  catch(error) {
    console.error(error)
  }
})

router.get('/userAnswer', (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0

  UserAnswer
  .findAll({limit, offset})
  .then(userAnswers => res.send(userAnswers))
  .catch(next)
})

router.get('/userAnswer/user/:id', (req, res, next) => {
  UserAnswer
  .findByPk(req.params.id)
  .then(userAnswer => res.send(userAnswer))
  .catch(next)
})

router.get('/userAnswer/user/:userId/:id', (req, res, next) => {
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