const Sequelize = require('sequelize')
const db = require('../db')

const Interviewee = db.define('interviewee', {
  email:
  {
    type: Sequelize.STRING
  },
})

module.exports = Interviewee;