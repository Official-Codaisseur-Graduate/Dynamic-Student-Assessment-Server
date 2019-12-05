const { Router } = require("express");
const Test = require("./model");
const router = new Router();
const Response = require("../Response/model");
const { getCorrect } = require("../constants");

router.post("/test", (req, res, next) => {
  try {
    const intervieweeId = req.query.intervieweeId;
    if (intervieweeId) {
      // function to generate one time password
      const generateOTP = () => {
        const intialValue =
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let OTP = "";
        let length = intialValue.length;
        for (let i = 0; i < 6; i++) {
          OTP += intialValue[Math.floor(Math.random() * length)];
        }
        return OTP;
      };
      const data = {
        intervieweeId: intervieweeId,
        code: generateOTP()
      };
      Test.create(data).then(res.send(data));
    }
  } catch (error) {
    next(error);
  }
});

router.get("/test/:code", (req, res, next) => {
  Test.findOne({
    where: {
      code: req.params.code
    }
  })
    .then(answer => {
      if (!answer) {
        res.status(400).send({
          message: "Code incorrect"
        });
      }
      res.send(answer);
    })
    .catch(next);
});
router.put("/test/:code", (req, res, next) => {
  Test.findOne({
    where: {
      code: req.params.code
    }
  })
    .then(answer => answer.update(req.body))
    .then(answer => res.send(answer))
    .catch(next);
});

//================================================

router.put("/testscore/:id", (req, res, next) => {
  const id = req.params.id;

  Response.findAll({
    where: {
      testId: id
    }
  }).then(answers => {
    if (!answers) {
      res.status(400).send({
        message: "TestId incorrect"
      });
    }
    const answerIds = answers.map(answer => answer.answerId);
    getCorrect(answerIds)
      .then(answers => {
        const booleans = answers.map(answer => answer.correct);
        let points = 0;
        for (let i = 0; i < booleans.length; i++) {
          if (booleans[i] === true) points++;
        }
        // console.log("pointsfromfunction", points, typeof points);
        return points;
      })
      .then(points =>
        Test.update(
          { score: points },
          {
            where: {
              id: req.params.id
            }
          }
        )
          .then(test => {
            res.send(test);
          })
          .catch(next)
      );
  });
});

module.exports = router;
