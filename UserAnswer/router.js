const { Router } = require("express")
const UserAnswer = require("./model")
const Answer = require("../Answer/model")
const Question = require("../Question/model")
const router = new Router()

//we are actually not using this post endpoint (read important note in readme)
router.post("/userAnswer", (req, res, next) => {
	UserAnswer.create(req.body)
		.then(userAnswer => {
			res.send(userAnswer)
		})
		.catch(next)
})

// the req.params.answerId here is NOT the UserAnswer id, but the id of the chosen answer in the front end
router.put("/userAnswer/:id/:answerId", async (req, res, next) => {
	try {
		console.log('checking req body',req.body)
		const chosenAnswer = await Answer.findByPk(req.params.answerId)
		const correct = chosenAnswer.correct
		let userAnswer = await UserAnswer.findByPk(req.params.id)

		if (!userAnswer) {
			//you could also just make an empty UserAnswer without a req.body...
			userAnswer = await UserAnswer.create(req.body)
		}

		const updatedUserAnswer = await userAnswer.update({
			// categoryId: find a way to add this here,
			questionId: chosenAnswer.questionId,
			answerId: req.params.answerId,
			correct: correct
		})
		res.send(updatedUserAnswer)
	} catch (error) {
		next(error)
	}
})

//get all userAnswers of every user
router.get("/userAnswer", (req, res, next) => {
	const limit = req.query.limit || 25
	const offset = req.query.offset || 0

	UserAnswer.findAll({ limit, offset })
		.then(userAnswers => res.send(userAnswers))
		.catch(next)
})

//get userAnswers of a specific user
router.get("/userAnswer/user/:id", (req, res, next) => {
	UserAnswer.findAll({
		where: {
			userId: req.params.id
		}
	})
		.then(userAnswers => res.send(userAnswers))
		.catch(next)
})

//get main score of a user
router.get("/user/:id/score", async (req, res, next) => {
	const UserAnswers = await UserAnswer.findAll({
		where: {
			userId: req.params.id
		}
	})
	const correctAnswers = await UserAnswers.filter(
		answer => answer.correct === true
	)
	const score = (await correctAnswers.length) / UserAnswers.length
	res.status(200).send({ score: `${Math.floor(score * 100)}%` })
})

//get score per category of one user
router.get(
	"/userAnswer/user/:userId/category/:categoryId",
	(req, res, next) => {
		UserAnswer.findAll({
			include: [
				{
					model: Answer,
					include: [
						{
							model: Question,
							where: {
								categoryId: req.params.categoryId
							}
						}
					]
				}
			],
			where: {
				userId: req.params.userId
			}
		})
			.then(userAnswersByCategory => {
				const correctAnswers = userAnswersByCategory.filter(
					answer => answer.correct === true
				)
				const categoryScore =
					correctAnswers.length / userAnswersByCategory.length
				res.send({ categoryScore: `${Math.floor(categoryScore * 100)}%` })
			})
			.catch(next)
	}
)

module.exports = router
