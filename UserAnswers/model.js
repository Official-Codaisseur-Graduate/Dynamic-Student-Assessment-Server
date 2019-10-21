const Sequelize = require('sequelize')
const db = require('../db')

const UserAnswer = db.define('userAnswer', {
  userId:
  {
    type: Sequelize.INTEGER
  },
  questionId: 
  {
    type: Sequelize.INTEGER
  },
  answerId:
  {
    type: Sequelize.INTEGER
  }
})

module.exports = UserAnswer;
