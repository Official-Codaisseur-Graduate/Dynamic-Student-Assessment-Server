const Sequelize = require('sequelize')
const db = require('../db')

const Answer = db.define('answer', {
  answerContent: 
  {
    type: Sequelize.STRING
  },
  correct:
  {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Answer;
