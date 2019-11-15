const Sequelize = require("sequelize")
const db = require("../db")

const Admin = db.define("admin", {
	email: {
		type: Sequelize.STRING,
		unique: true
	},
	password: {
		type: Sequelize.STRING
	}
})

module.exports = Admin
