const Sequelize = require("sequelize")
const db = require("../db")
const Category = require("../Category/model")

const Question = db.define("question", {
	questionContent: {
		type: Sequelize.STRING,
		allowNull: false
	},
	initialLevel: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

Category.hasMany(Question)
Question.belongsTo(Category)

module.exports = Question
