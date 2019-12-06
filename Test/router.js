const { Router } = require("express");
const Test = require("./model");
const router = new Router();
const Response = require("../Response/model");
const { getCorrect } = require("../constants");
const Question = require("../Question/model");
const Answer = require("../Answer/model");

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
    getCorrect(answerIds).then(answers => {
      const booleans = answers.map(answer => answer.correct);
      const booleanTrue = booleans.filter(boolean => boolean === true);

      Answer.findAll({
        where: { id: answerIds, correct: true },
        include: [Question]
      })
        .then(answers => answers.map(answer => answer.question.initialLevel))
        .then(level => {
          let points = 0;
          for (let i = 0; i < level.length; i++) {
            if (booleanTrue && level[i] === 0) {
              points = points + 1;
            }
            if (booleanTrue && level[i] === 1) {
              points = points + 2;
            }
            if (booleanTrue && level[i] === 2) {
              points = points + 3;
            }
          }
          console.log("boolean", booleanTrue);

          console.log("boolean", points);
          console.log("boolean", level);

          return points;

          //  booleans.find(boolean => boolean) === true) {
          //     // if (level.map(lv => lv) === 0) {
          //     //   return (points = points + 1);
          //     // }
          //     // if (level.map(lv => lv) === 1) {
          //     //   return (points = points + 1);
          //     // }
          //     // points++;
          //     // console.log("points", points);
          //   }
          // return points;
          // if (booleans[i] === true && level[i] === 2) {
          //   points = points + 1;
          // }
        })

        .then(points =>
          Test.update(
            { score: points },
            {
              where: {
                id: req.params.id
              }
            }
          ).catch(next)
        );
    });
  });
});

// get the score of an interviewee
router.get("/test-result/:intervieweeId", (req, res, next) => {
  Test.findOne({
    where: {
      intervieweeId: req.params.intervieweeId
    }
  })
    .then(answer => {
      if (!answer) {
        res.status(400).send({
          message: "No interviewee test result with such id"
        });
      }
      res.send(answer);
    })
    .catch(next);
});

module.exports = router;
