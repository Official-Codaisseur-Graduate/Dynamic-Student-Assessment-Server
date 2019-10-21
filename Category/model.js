const Sequelize = require('sequelize')
const sequelize = require('../db')

const Category = sequelize.define('category', {
    content: {
        type: Sequelize.STRING
    },
    topic: {
        type: Sequelize.INTEGER
    }
})

module.exports = Category
