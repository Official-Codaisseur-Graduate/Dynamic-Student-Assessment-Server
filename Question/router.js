const { Router } = require('express')
const Question = require('./model')
const Answer = require('../Answer/model')
const UserAnswer = require('../UserAnswers/model')
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

router.get('/question/:index', async (req, res, next) => {
    try { 
        let newLevel = 0
        let first = 1

        if(req.params.index === 1) {
            const newQuestions = await Question.findAll({ 
                where: { 
                    initialLevel: 0,
                    include: [{
                        model: Category,
                        attributes: ['topic']
                    }]
                }
            })
            let random  = Math.floor(Math.random() * Math.floor(newQuestions.length))
            const firstQuestion = newQuestions[random]
            res.send(firstQuestion)
        } else {
            const previousAnswer = await UserAnswer.findByPk(req.params.index - first,
                {
                    include: [{
                        model: Answer,
                        attributes: ['correct']
                    }]
                })
    
            console.log('THIS IS THE PREVIOUS ANSWER', previousAnswer)
        
            if (previousAnswer) {    
                //then put that previous answer in the algorithm and check if it was correct
                newLevel = await AdaptiveQuestionAlgorithm(previousAnswer)
            } 
            
            console.log('THIS IS THE NEW LEVEL', newLevel)
            //lastly, return a new question, based on what the algortithm decides.
            const possibleNewQuestions = await Question.findAll({ 
                where: { 
                    initialLevel: newLevel,
                    include: [{
                        model: Category,
                        attributes: ['topic']
                    }]
                }
            })
            
            console.log('THESE ARE THE POSSIBLE QUESTIONS', possibleNewQuestions.length)
            let random  = Math.floor(Math.random() * Math.floor(possibleNewQuestions.length))
            console.log('THIS IS THE RANDOM NUMBER', random)
            const newQuestion = possibleNewQuestions[random]
            console.log('THIS IS THE NEW QUESTION', newQuestion)
            res.send(newQuestion) 
        }
    }
    catch(error) {
        console.error(error)
    }
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