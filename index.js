const app = require("./app");
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const db = require("./db");
const Question = require("./Question/model");
const Answer = require("./Answer/model");
const Category = require("./Category/model");
const Interviewee = require("./Interviewee/model");
const Admin = require("./Admin/model");
const Test = require("./Test/model");
const Response = require("./Response/model");

const {
  adminListHashedPassword,
  intervieweeList,
  categoryList,
  questionList,
  answerList,
  testList,
  responseList
} = require("./seeding");

db.sync({ force: false })
  .then(async () => {
    console.log("Database schema updated");
    /* await Admin.bulkCreate(adminListHashedPassword);
    await Interviewee.bulkCreate(intervieweeList);
    await Category.bulkCreate(categoryList);
    await Question.bulkCreate(questionList);
    await Answer.bulkCreate(answerList);
    await Test.bulkCreate(testList);
    await Response.bulkCreate(responseList); */
  })
  .catch(console.error);
