const Sequelize = require("sequelize")
const db = require("../db")
const Interviewee = require("../Interviewee/model")

const Test = db.define("test", {
	score: {
		type: Sequelize.INTEGER
	},
	status: {
		type: Sequelize.INTEGER
	},
	code: {
		type: Sequelize.STRING
	}
})

Test.belongsTo(Interviewee)
Interviewee.hasMany(Test)

module.exports = Test
