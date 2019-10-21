const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors')
const corsMiddleware = cors()

app.use(corsMiddleware)
app.use(jsonParser)

function onListen() {
  console.log(`Server running on port ${port}`)
}

app.listen(port, onListen)