const { Router } = require("express")
const Question = require("./model")
const Answer = require("../Answer/model")
const UserAnswer = require("../UserAnswer/model")
const Category = require("../Category/model")
const router = new Router()
const auth = require("../Auth/middleware")
const AdaptiveQuestionAlgorithm = require("../AdaptiveQuestionAlgorithm")

router.post("/question", auth, async (req, res, next) => {
	const { questionContent, categoryId } = req.body

	if (questionContent && categoryId) {
		const newQuestion = {
			questionContent,
			initialLevel: null,
			calculatedLevel: null,
			categoryId
		}

		await Question.create(newQuestion)
			.then(result => res.status(201).json(result.id))
			.catch(error => console.log("Error while creating new question: ", error))
	} else {
		res.status(400).send({ message: "Please complete all the required fields" })
	}
})

router.get("/question", auth, (req, res, next) => {
	//intial setup for pagination?
	const limit = req.query.limit || 25
	const offset = req.query.offset || 0
	Question.findAll({
		limit,
		offset,
		include: [
			{
				model: Category,
				attributes: ["topic"]
			},
			{
				model: Answer
			}
		]
	})
		.then(questions => {
			if (!questions) {
				res.status(404).send("No questions found")
			} else {
				return res.send(questions)
			}
		})
		.catch(next)
})

router.get("/question/:index", async (req, res, next) => {
	try {
		let newLevel = 0

		const newQuestions = await Question.findAll({
			where: {
				initialLevel: 0
			},
			include: [
				{
					model: Category,
					attributes: ["topic"]
				},
				{
					model: Answer
				}
			]
		})
		let randomFirst = Math.floor(
			Math.random() * Math.floor(newQuestions.length)
		)
		const firstQuestion = newQuestions[randomFirst]
		// This is wrong!! only the first random question is working.

		const previousAnswer = await UserAnswer.findOne({
			include: [
				{
					model: Answer,
					attributes: ["correct", "questionId"],
					// this is NOT Right previousQuestion is rondam so it should not be index - 1
					// we should send the last answer together when we do request to get a random question
					// request will include a AnswerId from where we can check the previous answer,
					// so the request should take a query params that has answerId
					// like http get "/question/:index?lastAnswerId=id
					// or it makes more sense also user index as query parameter so it is
					// more restful , and will not be confused with editing questin with id
					// like when you do http put "/question/:id"
					where: { questionId: req.params.index - 1 }
				}
			]
		})

		//put that previous answer in the algorithm and check if it was correct
		//(it returns a newLevel)
		newLevel = await AdaptiveQuestionAlgorithm(previousAnswer)

		//lastly, return a new question, based on the level the algortithm decides
		const possibleNewQuestions = await Question.findAll({
			where: {
				initialLevel: newLevel
			},
			include: [
				{
					model: Category,
					attributes: ["topic"]
				},
				{
					model: Answer
				}
			]
		})

		let randomNew = Math.floor(
			Math.random() * Math.floor(possibleNewQuestions.length)
		)
		const newQuestion = possibleNewQuestions[randomNew]

		//if this is the very first question of the test
		if (req.params.index !== 1) {
			res.send(newQuestion)
		} else {
			res.send(firstQuestion)
		}
	} catch (error) {
		console.error(error)
	}
})

router.put("/question/:id", (req, res, next) => {
	Question.findByPk(req.params.id)
		.then(question => {
			if (!question) {
				res.status(404).send("question not found")
			} else {
				question.update(req.body).then(updatedQuestion => {
					res.send(updatedQuestion)
				})
			}
		})
		.catch(next)
})

router.delete("/question/:id", (req, res, next) => {
	Question.findByPk(req.params.id).then(question => {
		if (!question) {
			res.status(404).send("question not found")
		} else {
			question.destroy()
			res.status(200).send(`Destroyed question ${req.params.id}`)
		}
	})
})

// when user taking test need a new question
// front end make a request as "baseurl/testquestion?previousAnswerId=id"
router.get("/test-question", async (req, res, next) => {
	try {
		// get previousAnswerId  from request query params
		const { previousAnswerId } = req.query
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
		const level = !previousLevel
			? 0
			: correct
			? Number(previousLevel) + 1
			: Number(previousLevel)
		// find a question of calculated difficulty level
		const questions = await Question.findAll({
			// when there are test model as well, you can exclude questions already in the test
			where: { initialLevel: level }
		})
		// send back a random one
		const question = questions[Math.floor(Math.random() * questions.length)]

		res.send(question)
	} catch (error) {
		next(error)
	}
})

module.exports = router
