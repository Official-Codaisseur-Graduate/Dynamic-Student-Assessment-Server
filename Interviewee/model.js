const Sequelize = require('sequelize')
const db = require('../db')

const Interviewee = db.define('interviewee', {
  email:
  {
    type: Sequelize.STRING
  },
  code:
  {
    type: Sequelize.STRING
  },
  status:
  {
    type: Sequelize.STRING
  }
})

module.exports = Interviewee;