const Sequelize = require('sequelize')
const sequelize = require('../db')

const Answer = sequelize.define('answer', {
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
