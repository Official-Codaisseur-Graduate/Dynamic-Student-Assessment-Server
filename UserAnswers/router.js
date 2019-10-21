const { Router } = require('express')
const UserAnswer = require('./model')
const router = new Router()

router.post('userAnswers', (req, res, next) => {
  UserAnswer
  .create(req.body)
  .then(userAnswers => res.send(userAnswers))
  .catch(next)
})

module.exports = router;