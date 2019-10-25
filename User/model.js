const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: 
  {
    type: Sequelize.STRING
  },
  lastName:
  {
    type: Sequelize.STRING
  },
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
  },
  status:
  {
    type: Sequelize.STRING
  },
  classNumber:
  {
    type: Sequelize.INTEGER
  },
  score:
  {
    type: Sequelize.INTEGER
  }
})

module.exports = User;