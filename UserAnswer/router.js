const { Router } = require('express')
const UserAnswer = require('./model')
const router = new Router()

// 1
router.post('/userAnswer', (req, res, next) => {
  // this is the frontend way:
  // UserAnswer.create({
    // userId: req.body.user.userId,
    // questionId: req.body.answer.questionId,
    // categoryId: req.body.answer.categoryId
  // })

  // this is the backend testing way:
  UserAnswer.create(req.body)
  .then(userAnswer => {
    res.send(userAnswer)
  })
  .catch(next)
})

// 2
router.put('/userAnswer/:id', (req, res, next) => {
  UserAnswer.findByPk(req.params.id)
  .then(answer => {
    // this is the frontend way:
    // answer.update({
    //   correct: req.body.answer.correct
    // })

    //this is the backend testing way:
    answer.update(
      req.body
    )
      .then(updatedAnswer => {
        res.send(updatedAnswer)
      })
  })
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

router.get('/userAnswer/user/:id', (req, res, next) => {
  UserAnswer
  .findByPk(req.params.id)
  .then(userAnswer => res.send(userAnswer))
  .catch(next)
})

//3
router.get('/userAnswer/user/:userId/:id', (req, res, next) => {
  UserAnswer
  .findByPk(req.params.id)
  .then(userAnswer => res.send(userAnswer))
  .catch(next)
})

module.exports = router;