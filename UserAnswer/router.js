const { Router } = require('express')
const UserAnswer = require('./model')
const Answer = require('../Answer/model')
const Category = require('../Category/model')
const Question = require('../Question/model')
const router = new Router()

// when getting a new question (front end), immediately create an 'empty' UserAnswer (to be updated later when actually answering the question)
// // this is so that the student can go back and change their answer
// router.post('/userAnswer', (req, res, next) => {
//   // this is the frontend way:
//   // UserAnswer.create({
//     // userId: req.body.user.userId,
//     // questionId: req.body.Question.id,
//     // categoryId: req.body.Category.id
//   // })

//   // this is the backend testing way:
//   UserAnswer.create(req.body)
//   .then(userAnswer => {
//     res.send(userAnswer)
//   })
//   .catch(next)
// })

// the req.params.id here is NOT the userAnswer id, but the id of the chosen answer in the front end
router.put('/userAnswer/:id/:answerId', async (req, res, next) => {
  const chosenAnswer = await Answer.findByPk(req.params.answerId)
  const correct = chosenAnswer.correct
  let userAnswer = await UserAnswer.findByPk(req.params.id)
  
  if(!userAnswer) {
    userAnswer = await UserAnswer.create(
      // {
      // userId: req.body.user.userId,
      // questionId: req.body.Question.id,
      // categoryId: req.body.Category.id
      // }
      req.body
    )
  }

  const updatedUserAnswer = await userAnswer.update({
    // categoryId: chosenAnswer.Category.id,
    // questionId: chosenAnswer.Question.id,
    answerId: req.params.answerId,
    correct: correct
  })
    res.send(updatedUserAnswer)
})

//get all userAnswers of every user
router.get('/userAnswer', (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0

  UserAnswer
  .findAll({limit, offset})
  .then(userAnswers => res.send(userAnswers))
  .catch(next)
})

//get userAnswers of a specific user
router.get('/userAnswer/user/:id', (req, res, next) => {
  UserAnswer
  .findAll({
    where: {
      userId: req.params.id
    }
  })
  .then(userAnswers => res.send(userAnswers))
  .catch(next)
})

//get main score of a user
router.get('/user/:id/score', async (req, res, next) => {
  const UserAnswers = await UserAnswer.findAll({
    where: {
      userId: req.params.id
    }
  })
  const correctAnswers = await UserAnswers.filter(answer => answer.correct === true)
  const score = await correctAnswers.length / UserAnswers.length
  res.status(200).send({ score: `${Math.floor(score * 100)}%` })
})

//get score per category of one user
router.get('/userAnswer/user/:userId/category/:categoryId', (req, res, next) => {
  UserAnswer
  .findAll({
    where: {
      userId: req.params.userId,
      categoryId: req.params.categoryId
    }
  })
  .then(userAnswersByCategory => {
    const correctAnswers = userAnswersByCategory.filter(answer => answer.correct === true)
    const categoryScore = correctAnswers.length / userAnswersByCategory.length
    res.send({ categoryScore: `${Math.floor(categoryScore * 100)}%` })
  })
  .catch(next)
})

module.exports = router;