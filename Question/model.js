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

Question.belongsTo(Category)
Question.hasMany(Answer)
Answer.belongsTo(Question)
Answer.belongsTo(Category)

module.exports = Question