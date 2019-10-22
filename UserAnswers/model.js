const Sequelize = require('sequelize')
const db = require('../db')
const Answer = require('../Answer/model')
const Question = require('../Question/model')

const UserAnswer = db.define('UserAnswer', {
  userId:
  {
    type: Sequelize.INTEGER
  },
})

UserAnswer.belongsTo(Answer)
UserAnswer.belongsTo(Question)

module.exports = UserAnswer;
