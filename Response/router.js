const { Router } = require("express")
const Response = require("./model")
const router = new Router()

// when interviewee selected an answer for a test
router.put("/response/:testId/answerId", async (req, res, next) => {
	try {
		const { testId, answerId } = req.params
		// find if in the same test there is an answer for the same question
		const response = await Response.findOne({
			where: {
				testId,
				answerId
			}
		})
		res.send(response)
	} catch (error) {
		next(error)
	}
})

module.exports = router
