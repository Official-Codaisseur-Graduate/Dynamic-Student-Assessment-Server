const Sequelize = require('sequelize')
const db = require('../db')
const Answer = require('../Answer/model')
const Category = require('../Category/model')

const Question = db.define('question', {
    questionContent: {
        type: Sequelize.STRING
    },
    initialLevel: {
        type: Sequelize.INTEGER
    },
    calculatedLevel: {
        type: Sequelize.INTEGER
    },
    categoryId: {
        type: Sequelize.INTEGER
    }
})

Question.hasMany(Answer)
Question.belongsTo(Category)
Answer.belongsTo(Question)

module.exports = Question