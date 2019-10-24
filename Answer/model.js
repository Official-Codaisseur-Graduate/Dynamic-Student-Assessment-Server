const Sequelize = require('sequelize')
const db = require('../db')

const Answer = db.define('answer', {
  answerContent: 
  {
    type: Sequelize.STRING
  },
  questionId:
  {
    type: Sequelize.INTEGER
  },
  correct:
  {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Answer;
