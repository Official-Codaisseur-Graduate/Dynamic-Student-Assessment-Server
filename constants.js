const maxDifficultyLevel = 2;
const db = require("./db");

// Two queries with SQL to show the percentage of students that answered the question correct, instead of Sequelize queries (explained in the READ ME)
async function successRate(questionId) {
  const id = parseInt(questionId) || 0;
  let queryTotalAnswers = `SELECT count(*) `;
  queryTotalAnswers += `FROM responses AS r `;
  queryTotalAnswers += `INNER JOIN answers AS a `;
  queryTotalAnswers += `ON a."id"=r."answerId" `;
  queryTotalAnswers += `WHERE a."questionId"=${id}`;
  const resultTotalAnswers = await db.query(queryTotalAnswers);
  const totalAnswers = parseInt(resultTotalAnswers[0][0].count);

  let queryCorrectAnswers = `SELECT count(*) `;
  queryCorrectAnswers += `FROM responses AS r `;
  queryCorrectAnswers += `INNER JOIN answers AS a `;
  queryCorrectAnswers += `ON a."id"=r."answerId" `;
  queryCorrectAnswers += `WHERE a."questionId"=${id} AND a."correct"=TRUE`;
  const resultCorrectAnswers = await db.query(queryCorrectAnswers);
  const correctAnswers = parseInt(resultCorrectAnswers[0][0].count);

  if (totalAnswers > 0 && correctAnswers > 0) {
    return (correctAnswers / totalAnswers) * 100;
  } else {
    return 0;
  }
}

module.exports = { maxDifficultyLevel, successRate };
