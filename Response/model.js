const db = require("../db")
const Test = require("../Test/model")
const Answer = require("../Answer/model")
Test.belongsToMany(Answer, { through: "responses" })
const Response = db.model("responses")
module.exports = Response
