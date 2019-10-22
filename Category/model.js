const Sequelize = require('sequelize')
const db = require('../db')
//const Question = require('../Question/model')

const Category = db.define('category', {
    topic: {
        type: Sequelize.STRING
    }
})

//Question.belongsTo(Category)

module.exports = Category
