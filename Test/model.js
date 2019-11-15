const Sequelize = require("sequelize")
const db = require("../db")
const Interviewee = require("../Interviewee/model")
const Answer = require("../Answer/model")

const Test = db.define("test", {
	score: {
		type: Sequelize.INTEGER
	},
	status: {
		type: Sequelize.INTEGER
  },
  code : {
   type: Sequelize.STRING
  }
})

// NEEDS TO BE CHANGED TO STUDENT I THINK
Test.belongsTo(Interviewee)
Interviewee.hasMany(Test)

module.exports = Test
