const Sequelize = require('sequelize')
const db = require('../db')
const Answer = require('../answers/model')
// const Category = require('../Caterogry/model')

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
// Category.belongsTo(Question)

module.exports = Question