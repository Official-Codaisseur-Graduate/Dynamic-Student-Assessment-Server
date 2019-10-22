const { Router } = require('express')
const Answer = require('./model')
const router = new Router()

router.post('/answer', (req, res, next) => {
  Answer
  .create(req.body)
  .then(newQuestion => res.send(newQuestion))
  .catch(next)
})

module.exports = router;