const { Router } = require("express")
const Test = require("./model")
const router = new Router()

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
          message: 'Code incorrect',
        });
      }
      res.send(answer)
    })
    .catch(next)
})


module.exports = router
