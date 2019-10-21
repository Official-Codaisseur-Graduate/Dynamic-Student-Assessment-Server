const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors')
const corsMiddleware = cors()
const answersRouter = require('./answers/router')
const questionRouter = require('./question/router')
const categoryRouter = require('./category/router')

app.use(corsMiddleware)
app.use(jsonParser)
app.use(answersRouter)
app.use(questionRouter)
app.use(categoryRouter)

function onListen() {
  console.log(`Server running on port ${port}`)
}

app.listen(port, onListen)