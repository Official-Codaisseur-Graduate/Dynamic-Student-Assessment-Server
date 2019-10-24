const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors')
const corsMiddleware = cors()
const answersRouter = require('./Answer/router')
const questionRouter = require('./question/router')
const userAnswersRouter = require('./UserAnswers/router')
const categoryRouter = require('./Category/router')
const userRouter = require('./User/router')

const db = require('./db')
const Question = require('./Question/model')
const Answer = require('./Answer/model')
const UserAnswer = require('./UserAnswers/model')
const Category = require('./Category/model')
const User = require('./User/model')
const login = require('./Auth/router')

db
.sync({force: false})
.then( async () => {
  console.log('Database schema updated')
  await Question.bulkCreate([
    {
      categoryId: 2,
      content: 'What is a function?',
      initialLevel: 1,
      calculatedLevel: 0
    },
    {
      categoryId: 1,
      content: 'What is a variable?',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 5,
      content: 'Let x = 13, b = ‘a’, c = x + b. What is c?',
      initialLevel: 2,
      calculatedLevel: 0
    },
    {
      categoryId: 2,
      content: 'Function banana(a) { console.log(a + ‘world’) } What does this function return?',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 3,
      content: 'Number is undefined’ What does ‘undefined’ mean?',
      initialLevel: 1,
      calculatedLevel: 0
    },
    {
      categoryId: 1,
      content: 'Declare a consistent variable b and assign it the value of 80',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 6,
      content: 'What kind of statement is used to execute actions based on a trigger or condition?',
      initialLevel: 2,
      calculatedLevel: 0
    },
    {
      categoryId: 1,
      content: 'What is a JavaScript element that represents either TRUE or FALSE values?',
      initialLevel: 1,
      calculatedLevel: 0
    },
    {
      categoryId: 6,
      content: 'What is the name of the statement that is used to exit or end a loop?',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 3,
      content: 'What does JSON mean?',
      initialLevel: 0,
      calculatedLevel: 0
    }
  ])
  await Answer.bulkCreate([
    {
      questionId: 1,
      content: 'Something that runs an operation and then returns something',
      correct: true
    },
    {
      questionId: 2,
      content: 'An element that stores something',
      correct: true
    },
    {
      questionId: 3,
      content: '‘13a’',
      correct: true
    },
    {
      questionId: 4,
      content: 'It doesn’t return anything',
      correct: true
    },
    {
      questionId: 5,
      content: 'Javascript does not know what ‘number’ is. It is not defined anywhere.',
      correct: true
    },
    {
      questionId: 6,
      content: 'Const b = 80',
      correct: true
    },
    {
      questionId: 7,
      content: 'Conditional statement',
      correct: true
    },
    {
      questionId: 8,
      content: 'Boolean',
      correct: true
    },
    {
      questionId: 9,
      content: 'Break',
      correct: true
    },
    {
      questionId: 10,
      content: 'Javascript Object Notation',
      correct: true
    },
    {
      questionId: 1,
      content: 'A mathematical equation',
      correct: false
    },
    {
      questionId: 2,
      content: 'A number',
      correct: false
    },
    {
      questionId: 3,
      content: 'Undefined',
      correct: false
    },
    {
      questionId: 4,
      content: 'hello world’',
      correct: false
    },
    {
      questionId: 5,
      content: 'It has no value',
      correct: false
    },
    {
      questionId: 6,
      content: 'Let b = 80',
      correct: false
    },
    {
      questionId: 7,
      content: 'Action statement',
      correct: false
    },
    {
      questionId: 8,
      content: 'Variable',
      correct: false
    },
    {
      questionId: 9,
      content: 'While loop',
      correct: false
    },
    {
      questionId: 10,
      content: 'Jimmy Stocks On Nutella',
      correct: false
    },
    {
      questionId: 1,
      content: 'Something useful',
      correct: false
    },
    {
      questionId: 2,
      content: 'A string',
      correct: false
    },
    {
      questionId: 3,
      content: '13a',
      correct: false
    },
    {
      questionId: 4,
      content: 'aworld',
      correct: false
    },
    {
      questionId: 5,
      content: 'It is 0',
      correct: false
    },
    {
      questionId: 6,
      content: 'Var b = 80',
      correct: false
    },
    {
      questionId: 7,
      content: 'Trigger statement',
      correct: false
    },
    {
      questionId: 8,
      content: 'If else element',
      correct: false
    },
    {
      questionId: 9,
      content: 'Switch statement',
      correct: false
    },
    {
      questionId: 10,
      content: 'Jessica Sleeps Over Night',
      correct: false
    },
    {
      questionId: 1,
      content: 'Something that works properly',
      correct: false
    },
    {
      questionId: 2,
      content: 'Var or let',
      correct: false
    },
    {
      questionId: 3,
      content: '13’a’',
      correct: false
    },
    {
      questionId: 4,
      content: 'Banana',
      correct: false
    },
    {
      questionId: 5,
      content: 'It is not calculated yet',
      correct: false
    },
    {
      questionId: 6,
      content: 'B = 80',
      correct: false
    },
    {
      questionId: 7,
      content: 'Function statement',
      correct: false
    },
    {
      questionId: 8,
      content: 'Fault',
      correct: false
    },
    {
      questionId: 9,
      content: 'Conditional statement',
      correct: false
    },
    {
      questionId: 10,
      content: 'Javascript Object Nintendo',
      correct: false
    }
  ])
  await Category.bulkCreate([
    {
      topic: 'Variables'
    },
    {
      topic: 'Functions'
    },
    {
      topic: 'Global'
    },
    {
      topic: 'Logic'
    },
    {
      topic: 'Type Coercion'
    },
    {
      topic: 'Statements'
    },
  ])
  await UserAnswer.bulkCreate([
    {
      questionId: 1,
      answerId: 4
    },
    {
      questionId: 2,
      answerId: 2
    },
    {
      questionId: 3,
      answerId: 4
    },
  ])
  await User.bulkCreate([
    {
      username: "Rein",
      email: "rein@codaisseur.dev",
      password: "rein123"
    }
  ])
})
.catch(console.error)

app.use(corsMiddleware)
app.use(jsonParser)
app.use(answersRouter)
app.use(questionRouter)
app.use(userAnswersRouter)
app.use(categoryRouter)
app.use(userRouter)
app.use(login)

function onListen() {
  console.log(`Server running on port ${port}`)
}

app.listen(port, onListen)