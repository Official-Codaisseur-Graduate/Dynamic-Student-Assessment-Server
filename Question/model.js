const Sequelize = require("sequelize")
const db = require("../db")
const Category = require("../Category/model")

const Question = db.define("question", {
	questionContent: {
		type: Sequelize.STRING
	},
	initialLevel: {
		type: Sequelize.INTEGER
	}
})

Category.hasMany(Question)
Question.belongsTo(Category)

module.exports = Question
