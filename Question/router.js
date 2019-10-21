const { Router } = require('express')
const Question = require('./model')
const router = new Router()

router.post('/question', (req, res, next) => {
  Question
  .create(req.body)
  .then(newQuestion => res.send(newQuestion))
  .catch(next)
})

module.exports = router;