const { Router } = require('express')
const Admin = require('./model')
const Sequelize = require('sequelize')
const router = new Router()

router.post('/admin',(req,res,next) => {
    const email = req.body.email
    const password = req.body.password
})