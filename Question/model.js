const Sequelize = require('sequelize')
const db = require('../db')
const Answer = require('../Answers/model')
const Category = require('../Category/model')

const Question = db.define('question', {
    content: {
        type: Sequelize.STRING
    },
    initialLevel: {
        type: Sequelize.INTEGER
    },
    calculatedLevel: {
        type: Sequelize.INTEGER
    }
})

Question.hasMany(Answer)
Question.belongsTo(Category)
Answer.belongSto(Question)

module.exports = Question