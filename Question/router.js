const { Router } = require("express")
const Question = require("./model")
const Answer = require("../Answer/model")
const Category = require("../Category/model")
const router = new Router()
const auth = require("../Auth/middleware")

// create a new question
router.post("/question", auth, async (req, res, next) => {
	try {
		const { questionContent, categoryId, level } = req.body

		if (questionContent && categoryId) {
			const newQuestion = {
				questionContent,
				initialLevel: level,
				categoryId
			}

			const question = await Question.create(newQuestion)
			if (!question) res.status(400).end()
			res.status(201).send(question)
		} else {
			res
				.status(400)
				.send({ message: "Please complete all the required fields" })
		}
	} catch (error) {
		next(error)
	}
})
// get all the questions
router.get("/question", auth, (req, res, next) => {
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
//Edit a question
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
//Delete a question
router.delete("/question/:id", (req, res, next) => {
	Question.findByPk(req.params.id)
		.then(question => {
			if (!question) {
				res.status(404).send("question not found")
			} else {
				question.destroy()
				res.status(200).send(`Destroyed question ${req.params.id}`)
			}
		})
		.catch(next)
})

module.exports = router
