const { Router } = require('express')
const Admin = require('../Admin/model')
const router = new Router()
const bcrypt = require('bcrypt')

//Route for creating an admin while signin up
router.post("/admin", (req, res, next) => {
    const email = req.body.email
    const password = bcrypt.hashSync(req.body.password,10)
    Admin.create({email,password})
    .then(admin => {
		res.send(admin)
	})
})

module.exports = router