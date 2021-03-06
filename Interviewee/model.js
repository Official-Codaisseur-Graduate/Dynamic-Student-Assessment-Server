const Sequelize = require("sequelize")
const db = require("../db")

const Interviewee = db.define("interviewee", {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	}
})

module.exports = Interviewee
