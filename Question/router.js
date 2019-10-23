const { Router } = require('express')
const Question = require('./model')
const Answer = require('../Answer/model')
const router = new Router()
const AdaptiveQuestionAlgorithm = require('../AdaptiveQuestionAlgorithm')


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
      .then(questions => {
          if(!questions) {
              res.status(404).send('No questions found')
          } else {
              return res.send(questions)
          }
    })
  .catch(next)
})

router.get('/question/:id', async (req, res, next) => {
    //first check if previous answer was (in)correct by requesting the related Answer by id - 1
    let first = 1
    if(req.params.id === 1) { 
        first = 0
    }

    const previousAnswer = 
        await router.get('userAnswer/:id', (req, res, next) => {
            UserAnswer.findByPk(req.params.id - first)
    })

    //then put that previous answer in the algorithm and check if it was correct
    const newLevel = await AdaptiveQuestionAlgorithm(previousAnswer)

    //lastly, return a new question, based on what the algortithm decides.
    const possibleNewQuestions = await Question.findAll({ 
        where: { 
            initialLevel: newLevel 
        }
    })
    
    let random  = Math.random(possibleNewQuestions.length)
    const newQuestion = await Question.findByPk(random)
    res.send(newQuestion)
    .catch(next)
  })

router.put('/question/:id', (req, res, next) => {
  Question.findByPk(req.params.id)
  .then(question => {
      if(!question) {
          res.status(404).send('question not found')
      } else {
          question.update(req.body)
          .then(updatedQuestion => {
              res.send(updatedQuestion)
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
          res.status(201).send(`Destroyed question ${req.params.id}`)
      }
  })
})

module.exports = router;