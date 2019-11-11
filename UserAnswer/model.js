const Sequelize = require("sequelize")
const db = require("../db")
const Answer = require("../Answer/model")
const User = require("../User/model")

const UserAnswer = db.define("user_answer", {
	correct: Sequelize.BOOLEAN
})

Answer.hasMany(UserAnswer)
UserAnswer.belongsTo(Answer)
User.hasMany(UserAnswer)
UserAnswer.belongsTo(User)

module.exports = UserAnswer
