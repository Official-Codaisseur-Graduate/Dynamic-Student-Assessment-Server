const express = require("express")
const app = express()

const cors = require("cors")
const corsMiddleware = cors()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

const answersRouter = require("./Answer/router")
const questionRouter = require("./Question/router")
const categoryRouter = require("./Category/router")
const intervieweeRouter = require("./Interviewee/router")
const adminRouter = require("./Admin/router")
const responseRouter = require("./Response/router")
const testRouter = require("./Test/router")
const loginRouter = require("./Auth/router")

app.use(corsMiddleware)
app.use(jsonParser)
app.use(answersRouter)
app.use(questionRouter)
app.use(categoryRouter)
app.use(intervieweeRouter)
app.use(adminRouter)
app.use(responseRouter)
app.use(testRouter)
app.use(loginRouter)

module.exports = app
