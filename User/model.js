const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  username: 
  {
    type: Sequelize.STRING
  },
  email:
  {
    type: Sequelize.STRING
  },
  password:
  {
    type: Sequelize.STRING
  }
})

module.exports = User;