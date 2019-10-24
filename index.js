const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors')
const corsMiddleware = cors()
const answersRouter = require('./Answer/router')
const questionRouter = require('./Question/router')
const userAnswersRouter = require('./UserAnswers/router')
const categoryRouter = require('./Category/router')
const userRouter = require('./User/router')

app.use(corsMiddleware)
app.use(jsonParser)
app.use(answersRouter)
app.use(questionRouter)
app.use(userAnswersRouter)
app.use(categoryRouter)
app.use(userRouter)

function onListen() {
  console.log(`Server running on port ${port}`)
}

app.listen(port, onListen)