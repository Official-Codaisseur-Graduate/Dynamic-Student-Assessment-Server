const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors')
const corsMiddleware = cors()
const answersRouter = require('./Answer/router')
const questionRouter = require('./Question/router')
const userAnswersRouter = require('./UserAnswer/router')
const categoryRouter = require('./Category/router')
const userRouter = require('./Interviewee/router')
const login = require('./Auth/router')
const bcrypt = require('bcrypt')

const db = require('./db')
const Question = require('./Question/model')
const Answer = require('./Answer/model')
const UserAnswer = require('./UserAnswer/model')
const Category = require('./Category/model')

const Interviewee = require('./Interviewee/model')
const Admin = require('./Admin/model')

const Test = require('./Test/model')
// const TestQuestion = require('./TestQuestion/model')


db
.sync({force: true})
.then( async () => {
  console.log('Database schema updated')
//List of admins 
  const adminList = [
    {
      email: "middletonhicks@assistix.com",
      password: "Brainclip",
    },
    {
      email: "alexandriamayo@brainclip.com",
      password: "Makingway",
    }
  ]
  const adminList1 = adminList.map(admin => {
          return {
            ...admin,
            password: bcrypt.hashSync(admin.password,10)
          }
  })
  await Admin.bulkCreate(adminList1)

  //Listof user/student/interviewee
  const intervieweeList = [
    {
      email: "websterkirby@eargo.com",
      code: "ABCD",
      status : '1'
    },
    {
      email: "bertabradley@isosure.com",
      code: "EFGH",
      status:'1'
    }
  ]
  await Interviewee.bulkCreate(intervieweeList)

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
  await Question.bulkCreate([
    {
      categoryId: 2,
      questionContent: 'What is a function?',
      initialLevel: 1,
      calculatedLevel: 0
    },
    {
      categoryId: 1,
      questionContent: 'What is a variable?',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 5,
      questionContent: 'Let x = 13, b = ‘a’, c = x + b. What is c?',
      initialLevel: 2,
      calculatedLevel: 0
    },
    {
      categoryId: 2,
      questionContent: 'Function banana(a) { console.log(a + ‘world’) } What does this function return?',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 3,
      questionContent: 'Number is undefined’ What does ‘undefined’ mean?',
      initialLevel: 1,
      calculatedLevel: 0
    },
    {
      categoryId: 1,
      questionContent: 'Declare a consistent variable b and assign it the value of 80',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 6,
      questionContent: 'What kind of statement is used to execute actions based on a trigger or condition?',
      initialLevel: 2,
      calculatedLevel: 0
    },
    {
      categoryId: 1,
      questionContent: 'What is a JavaScript element that represents either TRUE or FALSE values?',
      initialLevel: 1,
      calculatedLevel: 0
    },
    {
      categoryId: 6,
      questionContent: 'What is the name of the statement that is used to exit or end a loop?',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 3,
      questionContent: 'What does JSON mean?',
      initialLevel: 0,
      calculatedLevel: 0
    }
  ])
  await Answer.bulkCreate([
    {
      questionId: 1,
      answerContent: 'Something that runs an operation and then returns something',
      correct: true
    },
    {
      questionId: 2,
      answerContent: 'An element that stores something',
      correct: true
    },
    {
      questionId: 3,
      answerContent: '‘13a’',
      correct: true
    },
    {
      questionId: 4,
      answerContent: 'It doesn’t return anything',
      correct: true
    },
    {
      questionId: 5,
      answerContent: 'Javascript does not know what ‘number’ is. It is not defined anywhere.',
      correct: true
    },
    {
      questionId: 6,
      answerContent: 'Const b = 80',
      correct: true
    },
    {
      questionId: 7,
      answerContent: 'Conditional statement',
      correct: true
    },
    {
      questionId: 8,
      answerContent: 'Boolean',
      correct: true
    },
    {
      questionId: 9,
      answerContent: 'Break',
      correct: true
    },
    {
      questionId: 10,
      answerContent: 'Javascript Object Notation',
      correct: true
    },
    {
      questionId: 1,
      answerContent: 'A mathematical equation',
      correct: false
    },
    {
      questionId: 2,
      answerContent: 'A number',
      correct: false
    },
    {
      questionId: 3,
      answerContent: 'Undefined',
      correct: false
    },
    {
      questionId: 4,
      answerContent: 'hello world’',
      correct: false
    },
    {
      questionId: 5,
      answerContent: 'It has no value',
      correct: false
    },
    {
      questionId: 6,
      answerContent: 'Let b = 80',
      correct: false
    },
    {
      questionId: 7,
      answerContent: 'Action statement',
      correct: false
    },
    {
      questionId: 8,
      answerContent: 'Variable',
      correct: false
    },
    {
      questionId: 9,
      answerContent: 'While loop',
      correct: false
    },
    {
      questionId: 10,
      answerContent: 'Jimmy Stocks On Nutella',
      correct: false
    },
    {
      questionId: 1,
      answerContent: 'Something useful',
      correct: false
    },
    {
      questionId: 2,
      answerContent: 'A string',
      correct: false
    },
    {
      questionId: 3,
      answerContent: '13a',
      correct: false
    },
    {
      questionId: 4,
      answerContent: 'aworld',
      correct: false
    },
    {
      questionId: 5,
      answerContent: 'It is 0',
      correct: false
    },
    {
      questionId: 6,
      answerContent: 'Var b = 80',
      correct: false
    },
    {
      questionId: 7,
      answerContent: 'Trigger statement',
      correct: false
    },
    {
      questionId: 8,
      answerContent: 'If else element',
      correct: false
    },
    {
      questionId: 9,
      answerContent: 'Switch statement',
      correct: false
    },
    {
      questionId: 10,
      answerContent: 'Jessica Sleeps Over Night',
      correct: false
    },
    {
      questionId: 1,
      answerContent: 'Something that works properly',
      correct: false
    },
    {
      questionId: 2,
      answerContent: 'Var or let',
      correct: false
    },
    {
      questionId: 3,
      answerContent: '13’a’',
      correct: false
    },
    {
      questionId: 4,
      answerContent: 'Banana',
      correct: false
    },
    {
      questionId: 5,
      answerContent: 'It is not calculated yet',
      correct: false
    },
    {
      questionId: 6,
      answerContent: 'B = 80',
      correct: false
    },
    {
      questionId: 7,
      answerContent: 'Function statement',
      correct: false
    },
    {
      questionId: 8,
      answerContent: 'Fault',
      correct: false
    },
    {
      questionId: 9,
      answerContent: 'Conditional statement',
      correct: false
    },
    {
      questionId: 10,
      answerContent: 'Javascript Object Nintendo',
      correct: false
    }
  ])
  await UserAnswer.bulkCreate([
    {
      answerId: 4,
      userId: 1,
      correct: true
    },
    {
      answerId: 2,
      userId: 1,
      correct: true
    },
    {
      answerId: 4,
      userId: 1,
      correct: true
    },
    {
      answerId: 3,
      userId: 1,
    },
    {
      answerId: 2,
      userId: 1,
    },
    {
      answerId: 2,
      userId: 1,
    },
    {
      answerId: 1,
      userId: 1, 
    },
    {
      answerId: 3,
      userId: 1,
    },
    {
      answerId: 3,
      userId: 1,
    },
    {
      answerId: 3,
      userId: 1,
    },
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