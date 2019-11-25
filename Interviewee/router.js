const { Router } = require("express")
const Interviewee = require("./model")
const router = new Router()

router.post("/interviewee", (req, res, next) => {
	Interviewee.create(req.body)
		.then(interviewee => {
			res.send(interviewee)
		})
		.catch(next)
})

router.get("/interviewee", (req, res, next) => {
	const limit = req.query.per_page
	const page = parseInt(req.query.page)
	const offset = limit * (page - 1) || 0

	Interviewee.findAndCountAll({ limit, offset })
		.then(interviewees => {
			res.send({
				page: page,
				total: interviewees.count,
				rows: interviewees.rows
			})
		})
		.catch(next)
})

module.exports = router
