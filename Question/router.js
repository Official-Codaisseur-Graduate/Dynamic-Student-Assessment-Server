const { Router } = require('express')
const Question = require('./model')
const router = new Router()

router.post('/question', (req, res, next) => {
  Question
  .create(req.body)
  .then(newQuestion => res.send(newQuestion))
  .catch(next)
})

router.get('/question', (req, res, next) => {
  //pagination?
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0
  Question
      .findAll({limit, offset})
      .then(categories => {
          if(!categories) {
              res.status(404).send('No categories found')
          } else {
              return res.send(categories)
          }
    })
  .catch(next)
})

router.put('/question/:id', (req, res, next) => {
  Question.findByPk(req.params.id)
  .then(question => {
      if(!question) {
          res.status(404).send('question not found')
      } else {
          question.update(req.body)
          .then(updatedquestion => {
              res.send(updatedquestion)
          })
      }
  })
  .catch(next)
})

router.delete('/question/:id', (req, res, next) => {
  Question.findByPk(req.params.id)
  .then(question => {
      if(!question) {
          res.status(404).send('question not found')
      } else {
          question.destroy()
          res.status(201).send('Destroyed')
      }
  })
})

module.exports = router;