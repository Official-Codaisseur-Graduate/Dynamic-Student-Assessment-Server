const Sequelize = require("sequelize")

const databaseUrl =
	process.env.DATABASE_URL ||
	"postgres://postgres:secret@localhost:5432/postgres"

console.log("database_url:", databaseUrl)

const db = new Sequelize(databaseUrl)

// db.sync({ force: false })
// 	.then(() => console.log("Database schema updated"))
// 	.catch(console.error)

module.exports = db
