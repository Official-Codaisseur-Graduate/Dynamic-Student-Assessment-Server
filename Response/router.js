const { Router } = require("express")
const Response = require("./model")
const Answer = require("../Answer/model")
const Test = require("../Test/model")
const router = new Router()

// when interviewee selected an answer for a test
// send http put "baseUrl/response?testId=id&answerId=id"
// it is going to find all the answers in the test,
//	-if there is already an answer to the same question, replace the answer
//  -else add the answer
router.put("/response", async (req, res, next) => {
	try {
		const { testId, answerId } = req.query
		// find all the answers in the test
		const test = await Test.findByPk(testId)
		const answers = await test.getAnswers()
		// find the new answer provided
		const newAnswer = await Answer.findByPk(answerId)
		// there is an old answer to the same question
		const oldAnswer = answers.filter(
			answer => answer.questionId === newAnswer.questionId
		)
		// remove the oldAnswer
		if (oldAnswer) await test.removeAnswer(oldAnswer)
		// add the newAnswer
		await test.addAnswer(newAnswer)
		res.send(test)
	} catch (error) {
		next(error)
	}
})

module.exports = router
