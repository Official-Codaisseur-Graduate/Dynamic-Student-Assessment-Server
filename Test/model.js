const Sequelize = require('sequelize')
const db = require('../db')
const Interviewee = require ('../Interviewee/model')
const Question = require("../Question/model")

const Test = db.define('test', {
  score: 
  {
    type: Sequelize.INTEGER
  },
  status:
  {
    type: Sequelize.INTEGER
  }
})

// NEEDS TO BE CHANGED TO STUDENT I THINK
Test.belongsTo(Interviewee)
Interviewee.hasMany(Test)

Test.belongsToMany(Question, { through: 'test_question'});
Question.belongsToMany(Test, { through: 'test_question'});

module.exports = Test;