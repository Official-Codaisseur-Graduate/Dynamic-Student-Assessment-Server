const Sequelize = require("sequelize")
const db = require("../db")
const Question = require("../Question/model")

const Answer = db.define("answer", {
	answerContent: {
		type: Sequelize.STRING
	},
	correct: {
		type: Sequelize.BOOLEAN
	}
})
Question.hasMany(Answer)
Answer.belongsTo(Question)

module.exports = Answer
