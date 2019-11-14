const { Router } = require("express")
const Answer = require("../Answer/model")
const Test = require("../Test/model")
const Question = require("../Question/model")
const router = new Router()
const { maxDifficultyLevel } = require("../constants")

// when interviewee selected an answer for a test
// send http put "baseUrl/response?testId=id&answerId=id"
// it is going to find all the answers in the test,
//	-if there is already an answer to the same question, replace the answer
//  -else add the answer
router.post("/response", async (req, res, next) => {
	try {
		const { testId, answerId } = req.query
		// find all the answers in the test
		const test = await Test.findByPk(testId)
		const answers = await test.getAnswers()
		// find the new answer provided including the related question
		const answer = await Answer.findByPk(answerId, { include: [Question] })
		// const previousQuestion = !previousAnswer ? null : previousAnswer.question
		// there is an old answer to the same question
		const oldAnswer = answers.filter(
			answer => answer.questionId === answer.questionId
		)
		// remove the oldAnswer
		if (oldAnswer) await test.removeAnswer(oldAnswer)
		// add the newAnswer
		await test.addAnswer(answer)
		res.send(answer)
	} catch (error) {
		next(error)
	}
})
// when user taking testId need a new question
// send request with query params of testId and previousAnswerId
// front end make a request as "baseurl/testquestion?testId=id&previousAnswerId=id"
router.get("/test-question", async (req, res, next) => {
	try {
		// get previousAnswerId  from request query params
		const { previousAnswerId, testId } = req.query
		// find the previous answer and question
		const previousAnswer = await Answer.findByPk(previousAnswerId, {
			include: [Question]
		})
		// if there is no previous Answer, there is no previous Question
		// then it is the first question

		const previousQuestion = !previousAnswer ? null : previousAnswer.question
		const correct = !previousAnswer ? false : previousAnswer.correct
		// for first question, correct = false, previousLevel = 0
		// get previousLevel and correctness and calculate level
		const previousLevel = !previousQuestion ? 0 : previousQuestion.initialLevel
		const level =
			!correct || previousLevel === maxDifficultyLevel
				? Number(previousLevel)
				: Number(previousLevel) + 1
		// find questionIds of answers already in the test
		const test = await Test.findByPk(testId)
		const answers = await test.getAnswers()
		const questionIds = answers.map(answer => answer.questionId)
		// find all questions of newLevel excluding the ones already in questionIds

		const questions = await Question.findAll({
			// when there are test model as well, you can exclude questions already in the test
			where: {
				initialLevel: level,
				id: { [Op.notIn]: questionIds }
			}
		})
		// send back a random one
		const question = questions[Math.floor(Math.random() * questions.length)]
		res.send(question)
	} catch (error) {
		next(error)
	}
})

module.exports = router
