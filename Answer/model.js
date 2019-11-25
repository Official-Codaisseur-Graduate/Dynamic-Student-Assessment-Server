const Sequelize = require("sequelize")
const db = require("../db")
const Question = require("../Question/model")

const Answer = db.define("answer", {
	answerContent: {
		type: Sequelize.STRING,
		allowNull: false
	},
	correct: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
})
Question.hasMany(Answer)
Answer.belongsTo(Question)

module.exports = Answer
