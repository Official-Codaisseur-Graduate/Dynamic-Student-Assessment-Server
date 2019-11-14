const { Router } = require("express")
const Answer = require("./model")
const router = new Router()

router.post("/answer", async (req, res, next) => {
	await Answer.bulkCreate(
		req.body.map(answer => {
			return { answerContent: answer.answer, correct: answer.correct, questionId: answer.questionId }
		})
	)
})

router.get("/answer", (req, res, next) => {
	const limit = req.query.limit || 25
	const offset = req.query.offset || 0

	Answer.findAll({ limit, offset })
		.then(listAnswers => res.send(listAnswers))
		.catch(next)
})

router.get("/answer/question/:id", (req, res, next) => {
	Answer.findAll({
		where: {
			questionId: req.params.id
		}
	})
		.then(relatedAnswers => res.send(relatedAnswers))
		.catch(next)
})

router.get("/answer/:id", (req, res, next) => {
	Answer.findByPk(req.params.id)
		.then(answer => res.send(answer))
		.catch(next)
})

router.put("/answer/:id", (req, res, next) => {
	Answer.findByPk(req.params.id)
		.then(answer => answer.update(req.body))
		.then(answer => res.status(201).send(answer))
		.catch(next)
})

router.delete("/answer/:id", (req, res, next) => {
	Answer.destroy({ where: { id: req.params.id } })
		.then(numberDeleted => res.send({ numberDeleted }))
		.catch(next)
})

module.exports = router
