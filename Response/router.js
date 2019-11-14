const { Router } = require("express")
const Answer = require("../Answer/model")
const Test = require("../Test/model")
const Question = require("../Question/model")
const router = new Router()
const { maxDifficultyLevel } = require("../constants")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

// when interviewee selected an answer for a test
// send http put "baseUrl/response?testId=id&answerId=id"
// it is going to find all the answers in the test,
//	-if there is already an answer to the same question, replace the answer
//  -else add the answer
// after add the answer, response with a new question, that is of the new level and
// is not a question already in the test
router.post("/response", async (req, res, next) => {
	try {
		const { testId, answerId } = req.query
		// find all the answers in the test
		const test = await Test.findByPk(testId)
		const answers = await test.getAnswers()
		// find the current answer provided
		const currentAnswer = isNaN(Number(answerId))
			? null
			: await Answer.findByPk(Number(answerId), {
					include: [Question]
			  })

		// if currentAnswer does not exist, this is the first attempt to get a question
		// there is an old answer to the same question
		// if this is the question without an answer oldAnswer=null
		const oldAnswer = !currentAnswer
			? null
			: answers.filter(answer => answer.questionId === currentAnswer.questionId)
		// remove the oldAnswer
		if (oldAnswer) await test.removeAnswer(oldAnswer)
		// add the currentAnswer
		await test.addAnswer(currentAnswer)
		// if there is no current Answer, there is no current Question
		// then it is the first question
		const currentQuestion = !currentAnswer ? null : currentAnswer.question
		// for first question, correct = false, currentLevel = 0
		const correct = !currentAnswer ? false : currentAnswer.correct
		// get currentLevel and correctness and calculate level
		const currentLevel = !currentQuestion ? 0 : currentQuestion.initialLevel
		const nextLevel =
			!correct || currentLevel === maxDifficultyLevel
				? Number(currentLevel)
				: Number(currentLevel) + 1
		// find questionIds of answers already in the test
		const questionIds = answers.map(answer => answer.questionId)
		// find all questions of newLevel excluding the ones already in questionIds

		const questions = await Question.findAll({
			// when there are test model as well, you can exclude questions already in the test
			where: {
				initialLevel: nextLevel,
				id: { [Op.notIn]: questionIds }
			},
			include: [Answer]
		})
		// send back a random one
		const question = questions[Math.floor(Math.random() * questions.length)]
		res.send(question)
	} catch (error) {
		next(error)
	}
})

module.exports = router
