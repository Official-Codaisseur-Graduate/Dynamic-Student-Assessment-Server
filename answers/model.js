const Sequelize = require('./node_modules/sequelize')
const db = require('../db')

const Answer = db.define('answer', {
content: 
{
  type: Sequelize.STRING
},
questionId:
{
  type: Sequelize.INTEGER
},
correct:
{
  type: Sequelize.BOOLEAN
}
})

module.exports = Answer
