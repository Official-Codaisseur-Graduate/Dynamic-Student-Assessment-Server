const { Router } = require("express")
const Sequelize = require("sequelize")
const Question = require("./model")
const Answer = require("../Answer/model")
const Test = require("../Test/model")
const Category = require("../Category/model")
const router = new Router()
const auth = require("../Auth/middleware")
const { maxDifficultyLevel } = require("../constants")
const Op = Sequelize.Op
// create a new question
router.post("/question", auth, async (req, res, next) => {
	const { questionContent, categoryId, level } = req.body

	console.log("add question:", questionContent, categoryId, level)

	if (questionContent && categoryId) {
		const newQuestion = {
			questionContent,
			initialLevel: level,
			calculatedLevel: null,
			categoryId
		}
		console.log("should be good:", newQuestion)

		await Question.create(newQuestion)
			.then(result => res.status(201).json(result))
			.catch(error => console.log("Error while creating new question: ", error))
	} else {
		console.log("something is wrong...")

		res.status(400).send({ message: "Please complete all the required fields" })
	}
})
// get all the questions
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
	Question.findByPk(req.params.id).then(question => {
		if (!question) {
			res.status(404).send("question not found")
		} else {
			question.destroy()
			res.status(200).send(`Destroyed question ${req.params.id}`)
		}
	})
})

module.exports = router
