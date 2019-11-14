const { Router } = require('express')
const Interviewee = require('./model')
const router = new Router()
const auth = require('../Auth/middleware')


router.post('/interviewee', (req, res, next) => {
  Interviewee.create(req.body)
  .then(interviewee => {
  res.send(interviewee)
})
  
 });

 router.get('/interviewee', (req, res, next) => {
  const limit = req.query.per_page
  console.log("limit", limit)
  const page = parseInt(req.query.page)
  console.log("give me page ", page)
  const offset = limit * ( page-1 ) || 0
  console.log("offset", offset)
  Interviewee
  .findAndCountAll( {limit, offset})
  .then(interviewees => {
  res.send(
  { 
  page: page,
  total: interviewees.count,
  data: interviewees
  }
  )})
  .catch(next)
  })

 module.exports = router;