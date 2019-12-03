const { Router } = require("express");
const Answer = require("./model");
const router = new Router();
// req.body is an array of answers to be created in the backend
router.post("/answer", async (req, res, next) => {
  try {
    const answers = await Answer.bulkCreate(
      req.body.map(answer => {
        return {
          answerContent: answer.answer,
          correct: answer.correct,
          questionId: answer.questionId
        };
      })
    );
    if (!answers) res.status(400).end();
    res.status(201).send(answers);
  } catch (error) {
    next(error);
  }
});

router.get("/answer", (req, res, next) => {
  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;

  Answer.findAll({ limit, offset })
    .then(listAnswers => res.send(listAnswers))
    .catch(next);
});

router.get("/answer/question/:id", (req, res, next) => {
  Answer.findAll({
    where: {
      questionId: req.params.id
    }
  })
    .then(relatedAnswers => res.send(relatedAnswers))
    .catch(next);
});

router.get("/answer/:id", (req, res, next) => {
  Answer.findByPk(req.params.id)
    .then(answer => res.send(answer))
    .catch(next);
});

// update an array of answers
router.put("/answers", async (req, res, next) => {
  try {
    //deleting the old answers for a specific question
    await Answer.destroy({
      where: { questionId: req.body[0].questionId }
    });

    //creating new answers (with bulkCreate we can create data from an array)
    const newAnswers = await Answer.bulkCreate(
      req.body.map(answer => {
        return {
          answerContent: answer.answer,
          correct: answer.correct,
          questionId: answer.questionId
        };
      })
    );
    if (!newAnswers) res.status(400).end();
    res.status(201).send(newAnswers);
  } catch (error) {
    next(error);
  }
});

router.delete("/answer/:id", (req, res, next) => {
  Answer.destroy({ where: { id: req.params.id } })
    .then(numberDeleted => res.send({ numberDeleted }))
    .catch(next);
});

module.exports = router;
