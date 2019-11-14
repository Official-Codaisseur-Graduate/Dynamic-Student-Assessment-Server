const Sequelize = require("sequelize")
const db = require("../db")
const Interviewee = require("../Interviewee/model")

const Test = db.define("test", {
	score: {
		type: Sequelize.INTEGER
	},
	status: {
		type: Sequelize.ENUM("waiting", "ready", "done")
	}
})

// NEEDS TO BE CHANGED TO STUDENT I THINK
Test.belongsTo(Interviewee)
Interviewee.hasMany(Test)

module.exports = Test
