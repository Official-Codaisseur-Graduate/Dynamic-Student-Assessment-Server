const Sequelize = require('sequelize')
const db = require('../db')
const Answer = require('../Answer/model')
const Question = require('../Question/model')
const User = require('../User/model')

const UserAnswer = db.define('UserAnswer', {
  categoryId: Sequelize.INTEGER,
  correct: Sequelize.BOOLEAN
})

UserAnswer.belongsTo(User)
UserAnswer.belongsTo(Answer)
UserAnswer.belongsTo(Question)

module.exports = UserAnswer;
