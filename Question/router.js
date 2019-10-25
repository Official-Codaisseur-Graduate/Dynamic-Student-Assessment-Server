const { Router } = require('express')
const Question = require('./model')
const Answer = require('../Answer/model')
const UserAnswer = require('../UserAnswer/model')
const Category = require('../Category/model')
const router = new Router()
const AdaptiveQuestionAlgorithm = require('../AdaptiveQuestionAlgorithm')

router.post('/question', async (req, res, next) => {
    const { questionContent, categoryId } = req.body
 
    if (questionContent && categoryId) {
         const newQuestion = {
            questionContent,
             initialLevel: null,
            calculatedLevel: null,
            categoryId
        }

        await Question.create(newQuestion)
        .then(result => res.status(201).json(result.id))
        .catch(error => console.log('Error while creating new question: ', error))
    } else {
        res.status(400).send({'message' : 'Please complete all the required fields'})
    }
 })

router.get('/question', (req, res, next) => {
  //pagination?
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0
  Question
      .findAll({
            limit,
            offset,
            include: [
                {
                    model: Category,
                    attributes: ['topic']
                },
                {
                    model: Answer,
                },
            ]
        })
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

        const newQuestions = await Question.findAll({ 
            where: { 
                initialLevel: 0,
            },
            include: [
                {
                    model: Category,
                    attributes: ['topic']
                },
                {
                    model: Answer,
                }
            ]
        })
        let randomFirst  = Math.floor(Math.random() * Math.floor(newQuestions.length))
        const firstQuestion = newQuestions[randomFirst]

        const previousAnswer = await UserAnswer.findOne({     
            where: {
                questionId: req.params.index - 1
            },
            include: [{
                model: Answer,
                attributes: ['correct']
            }]
        })
    
        console.log('THIS IS THE PREVIOUS ANSWER', previousAnswer)
    
            //then put that previous answer in the algorithm and check if it was correct
        newLevel = await AdaptiveQuestionAlgorithm(previousAnswer)
        
        console.log('THIS IS THE NEW LEVEL', newLevel)
        //lastly, return a new question, based on what the algortithm decides.
        const possibleNewQuestions = await Question.findAll({ 
            where: { 
                initialLevel: newLevel,
            },
            include: [
                {
                    model: Category,
                    attributes: ['topic']
                },
                {
                    model: Answer
                },
            ]
        })
        
        console.log('THESE ARE THE POSSIBLE QUESTIONS', possibleNewQuestions.length)
        let randomNew  = Math.floor(Math.random() * Math.floor(possibleNewQuestions.length))
        console.log('THIS IS THE RANDOM NUMBER', randomNew)
        const newQuestion = possibleNewQuestions[randomNew]
        console.log('THIS IS THE NEW QUESTION', newQuestion)

        if(req.params.index !== 1) {
            res.send(newQuestion) 
        } else {
            res.send(firstQuestion)
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