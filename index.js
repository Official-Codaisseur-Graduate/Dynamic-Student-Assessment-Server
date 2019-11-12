const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors')
const corsMiddleware = cors()
const answersRouter = require('./Answer/router')
const questionRouter = require('./Question/router')
const userAnswersRouter = require('./UserAnswer/router')
const categoryRouter = require('./Category/router')
const userRouter = require('./User/router')
const login = require('./Auth/router')

const db = require('./db')
const Question = require('./Question/model')
const Answer = require('./Answer/model')
const UserAnswer = require('./UserAnswer/model')
const Category = require('./Category/model')
const User = require('./User/model')

db
.sync({force: true})
.then( async () => {
  console.log('Database schema updated')
  await User.bulkCreate([
    {
      firstName: "Middleton",
      lastName: "Hicks",
      email: "middletonhicks@assistix.com",
      password: "Brainclip",
      status: 3,
      score: 50,
      classNumber: 38
    },
    {
      firstName: "Alexandria",
      lastName: "Mayo",
      email: "alexandriamayo@brainclip.com",
      password: "Makingway",
      status: 2,
      score: 81,
      classNumber: 37
    },
    {
      firstName: "Davis",
      lastName: "Reeves",
      email: "davisreeves@makingway.com",
      password: "Zorromop",
      status: 2,
      score: 55,
      classNumber: 36
    },
    {
      firstName: "Anderson",
      lastName: "Knapp",
      email: "andersonknapp@zorromop.com",
      password: "Quotezart",
      status: 3,
      score: 86,
      classNumber: 36
    },
    {
      firstName: "Jerry",
      lastName: "Berry",
      email: "jerryberry@quotezart.com",
      password: "Assistix",
      status: 3,
      score: 73,
      classNumber: 36
    },
    {
      firstName: "Harriett",
      lastName: "Juarez",
      email: "harriettjuarez@assistix.com",
      password: "Lexicondo",
      status: 1,
      score: 45,
      classNumber: 36
    },
    {
      firstName: "Moran",
      lastName: "Sullivan",
      email: "moransullivan@lexicondo.com",
      password: "Hydrocom",
      status: 3,
      score: 78,
      classNumber: 37
    },
    {
      firstName: "Hewitt",
      lastName: "Stout",
      email: "hewittstout@hydrocom.com",
      password: "Automon",
      status: 2,
      score: 57,
      classNumber: 40
    },
    {
      firstName: "Cameron",
      lastName: "Hensley",
      email: "cameronhensley@automon.com",
      password: "Polarax",
      status: 2,
      score: 75,
      classNumber: 36
    },
    {
      firstName: "Estrada",
      lastName: "Gilliam",
      email: "estradagilliam@polarax.com",
      password: "Comtours",
      status: 3,
      score: 61,
      classNumber: 36
    },
    {
      firstName: "Juana",
      lastName: "Mcclure",
      email: "juanamcclure@comtours.com",
      password: "Xplor",
      status: 1,
      score: 69,
      classNumber: 37
    },
    {
      firstName: "Bruce",
      lastName: "Hart",
      email: "brucehart@xplor.com",
      password: "Bolax",
      status: 3,
      score: 53,
      classNumber: 35
    },
    {
      firstName: "Jimenez",
      lastName: "Patrick",
      email: "jimenezpatrick@bolax.com",
      password: "Stockpost",
      status: 3,
      score: 89,
      classNumber: 38
    },
    {
      firstName: "Lawson",
      lastName: "Cash",
      email: "lawsoncash@stockpost.com",
      password: "Accusage",
      status: 2,
      score: 40,
      classNumber: 40
    },
    {
      firstName: "Candy",
      lastName: "Holden",
      email: "candyholden@accusage.com",
      password: "Terragen",
      status: 1,
      score: 69,
      classNumber: 37
    },
    {
      firstName: "Wright",
      lastName: "Sims",
      email: "wrightsims@terragen.com",
      password: "Quonata",
      status: 1,
      score: 70,
      classNumber: 38
    },
    {
      firstName: "Sheree",
      lastName: "Blake",
      email: "shereeblake@quonata.com",
      password: "Amtap",
      status: 2,
      score: 84,
      classNumber: 39
    },
    {
      firstName: "Dolly",
      lastName: "Donaldson",
      email: "dollydonaldson@amtap.com",
      password: "Eargo",
      status: 2,
      score: 51,
      classNumber: 36
    },
    {
      firstName: "Webster",
      lastName: "Kirby",
      email: "websterkirby@eargo.com",
      password: "Magmina",
      status: 3,
      score: 32,
      classNumber: 35
    },
    {
      firstName: "Hopkins",
      lastName: "Mcbride",
      email: "hopkinsmcbride@magmina.com",
      password: "Isosure",
      status: 2,
      score: 40,
      classNumber: 40
    },
    {
      firstName: "Berta",
      lastName: "Bradley",
      email: "bertabradley@isosure.com",
      password: "Globoil",
      status: 1,
      score: 59,
      classNumber: 39
    },
    {
      firstName: "Janette",
      lastName: "Jennings",
      email: "janettejennings@globoil.com",
      password: "Eclipto",
      status: 2,
      score: 86,
      classNumber: 39
    },
    {
      firstName: "Deborah",
      lastName: "Shelton",
      email: "deborahshelton@eclipto.com",
      password: "Suremax",
      status: 1,
      score: 72,
      classNumber: 39
    },
    {
      firstName: "Becker",
      lastName: "Collier",
      email: "beckercollier@suremax.com",
      password: "Spacewax",
      status: 1,
      score: 77,
      classNumber: 35
    },
    {
      firstName: "Belinda",
      lastName: "Chambers",
      email: "belindachambers@spacewax.com",
      password: "Vortexaco",
      status: 2,
      score: 77,
      classNumber: 36
    },
    {
      firstName: "Frank",
      lastName: "Woodward",
      email: "frankwoodward@vortexaco.com",
      password: "Dragbot",
      status: 3,
      score: 95,
      classNumber: 35
    },
    {
      firstName: "Rosario",
      lastName: "Alston",
      email: "rosarioalston@dragbot.com",
      password: "Evidends",
      status: 3,
      score: 55,
      classNumber: 35
    },
    {
      firstName: "Allie",
      lastName: "Castro",
      email: "alliecastro@evidends.com",
      password: "Ecosys",
      status: 1,
      score: 99,
      classNumber: 39
    },
    {
      firstName: "Wilcox",
      lastName: "Malone",
      email: "wilcoxmalone@ecosys.com",
      password: "Harmoney",
      status: 2,
      score: 94,
      classNumber: 38
    },
    {
      firstName: "Johnnie",
      lastName: "Burke",
      email: "johnnieburke@harmoney.com",
      password: "Flotonic",
      status: 3,
      score: 49,
      classNumber: 37
    },
    {
      firstName: "Lacey",
      lastName: "Underwood",
      email: "laceyunderwood@flotonic.com",
      password: "Bostonic",
      status: 1,
      score: 30,
      classNumber: 37
    },
    {
      firstName: "Alford",
      lastName: "Morgan",
      email: "alfordmorgan@bostonic.com",
      password: "Musaphics",
      status: 2,
      score: 56,
      classNumber: 36
    },
    {
      firstName: "Dodson",
      lastName: "Tate",
      email: "dodsontate@musaphics.com",
      password: "Zolavo",
      status: 3,
      score: 92,
      classNumber: 40
    },
    {
      firstName: "Byers",
      lastName: "Erickson",
      email: "byerserickson@zolavo.com",
      password: "Bicol",
      status: 3,
      score: 94,
      classNumber: 36
    },
    {
      firstName: "Felecia",
      lastName: "Dunn",
      email: "feleciadunn@bicol.com",
      password: "Blurrybus",
      status: 1,
      score: 86,
      classNumber: 38
    },
    {
      firstName: "Eileen",
      lastName: "Douglas",
      email: "eileendouglas@blurrybus.com",
      password: "Conferia",
      status: 2,
      score: 98,
      classNumber: 38
    },
    {
      firstName: "Justine",
      lastName: "Koch",
      email: "justinekoch@conferia.com",
      password: "Bedder",
      status: 1,
      score: 50,
      classNumber: 40
    },
    {
      firstName: "Lina",
      lastName: "Cochran",
      email: "linacochran@bedder.com",
      password: "Aclima",
      status: 2,
      score: 58,
      classNumber: 39
    },
    {
      firstName: "Reyna",
      lastName: "Shepherd",
      email: "reynashepherd@aclima.com",
      password: "Repetwire",
      status: 1,
      score: 78,
      classNumber: 37
    },
    {
      firstName: "Manning",
      lastName: "Armstrong",
      email: "manningarmstrong@repetwire.com",
      password: "Eweville",
      status: 3,
      score: 64,
      classNumber: 38
    },
    {
      firstName: "Avis",
      lastName: "Conrad",
      email: "avisconrad@eweville.com",
      password: "Fuelworks",
      status: 2,
      score: 43,
      classNumber: 35
    },
    {
      firstName: "Avery",
      lastName: "Lloyd",
      email: "averylloyd@fuelworks.com",
      password: "Gushkool",
      status: 2,
      score: 48,
      classNumber: 35
    },
    {
      firstName: "Price",
      lastName: "Mcintyre",
      email: "pricemcintyre@gushkool.com",
      password: "Martgo",
      status: 2,
      score: 35,
      classNumber: 36
    },
    {
      firstName: "Cantu",
      lastName: "Conway",
      email: "cantuconway@martgo.com",
      password: "Unia",
      status: 3,
      score: 49,
      classNumber: 36
    },
    {
      firstName: "Ward",
      lastName: "Guzman",
      email: "wardguzman@unia.com",
      password: "Cosmosis",
      status: 3,
      score: 44,
      classNumber: 38
    },
    {
      firstName: "Ruby",
      lastName: "Yang",
      email: "rubyyang@cosmosis.com",
      password: "Valreda",
      status: 2,
      score: 99,
      classNumber: 37
    }
  ])
  await Category.bulkCreate([
    {
      topic: 'Variables'
    },
    {
      topic: 'Functions'
    },
    {
      topic: 'Global'
    },
    {
      topic: 'Logic'
    },
    {
      topic: 'Type Coercion'
    },
    {
      topic: 'Statements'
    },
  ])
  await Question.bulkCreate([
    {
      categoryId: 2,
      questionContent: 'What is a function?',
      initialLevel: 1,
      calculatedLevel: 0
    },
    {
      categoryId: 1,
      questionContent: 'What is a variable?',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 5,
      questionContent: 'Let x = 13, b = ‘a’, c = x + b. What is c?',
      initialLevel: 2,
      calculatedLevel: 0
    },
    {
      categoryId: 2,
      questionContent: 'Function banana(a) { console.log(a + ‘world’) } What does this function return?',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 3,
      questionContent: 'Number is undefined’ What does ‘undefined’ mean?',
      initialLevel: 1,
      calculatedLevel: 0
    },
    {
      categoryId: 1,
      questionContent: 'Declare a consistent variable b and assign it the value of 80',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 6,
      questionContent: 'What kind of statement is used to execute actions based on a trigger or condition?',
      initialLevel: 2,
      calculatedLevel: 0
    },
    {
      categoryId: 1,
      questionContent: 'What is a JavaScript element that represents either TRUE or FALSE values?',
      initialLevel: 1,
      calculatedLevel: 0
    },
    {
      categoryId: 6,
      questionContent: 'What is the name of the statement that is used to exit or end a loop?',
      initialLevel: 0,
      calculatedLevel: 0
    },
    {
      categoryId: 3,
      questionContent: 'What does JSON mean?',
      initialLevel: 0,
      calculatedLevel: 0
    }
  ])
  await Answer.bulkCreate([
    {
      questionId: 1,
      answerContent: 'Something that runs an operation and then returns something',
      correct: true
    },
    {
      questionId: 2,
      answerContent: 'An element that stores something',
      correct: true
    },
    {
      questionId: 3,
      answerContent: '‘13a’',
      correct: true
    },
    {
      questionId: 4,
      answerContent: 'It doesn’t return anything',
      correct: true
    },
    {
      questionId: 5,
      answerContent: 'Javascript does not know what ‘number’ is. It is not defined anywhere.',
      correct: true
    },
    {
      questionId: 6,
      answerContent: 'Const b = 80',
      correct: true
    },
    {
      questionId: 7,
      answerContent: 'Conditional statement',
      correct: true
    },
    {
      questionId: 8,
      answerContent: 'Boolean',
      correct: true
    },
    {
      questionId: 9,
      answerContent: 'Break',
      correct: true
    },
    {
      questionId: 10,
      answerContent: 'Javascript Object Notation',
      correct: true
    },
    {
      questionId: 1,
      answerContent: 'A mathematical equation',
      correct: false
    },
    {
      questionId: 2,
      answerContent: 'A number',
      correct: false
    },
    {
      questionId: 3,
      answerContent: 'Undefined',
      correct: false
    },
    {
      questionId: 4,
      answerContent: 'hello world’',
      correct: false
    },
    {
      questionId: 5,
      answerContent: 'It has no value',
      correct: false
    },
    {
      questionId: 6,
      answerContent: 'Let b = 80',
      correct: false
    },
    {
      questionId: 7,
      answerContent: 'Action statement',
      correct: false
    },
    {
      questionId: 8,
      answerContent: 'Variable',
      correct: false
    },
    {
      questionId: 9,
      answerContent: 'While loop',
      correct: false
    },
    {
      questionId: 10,
      answerContent: 'Jimmy Stocks On Nutella',
      correct: false
    },
    {
      questionId: 1,
      answerContent: 'Something useful',
      correct: false
    },
    {
      questionId: 2,
      answerContent: 'A string',
      correct: false
    },
    {
      questionId: 3,
      answerContent: '13a',
      correct: false
    },
    {
      questionId: 4,
      answerContent: 'aworld',
      correct: false
    },
    {
      questionId: 5,
      answerContent: 'It is 0',
      correct: false
    },
    {
      questionId: 6,
      answerContent: 'Var b = 80',
      correct: false
    },
    {
      questionId: 7,
      answerContent: 'Trigger statement',
      correct: false
    },
    {
      questionId: 8,
      answerContent: 'If else element',
      correct: false
    },
    {
      questionId: 9,
      answerContent: 'Switch statement',
      correct: false
    },
    {
      questionId: 10,
      answerContent: 'Jessica Sleeps Over Night',
      correct: false
    },
    {
      questionId: 1,
      answerContent: 'Something that works properly',
      correct: false
    },
    {
      questionId: 2,
      answerContent: 'Var or let',
      correct: false
    },
    {
      questionId: 3,
      answerContent: '13’a’',
      correct: false
    },
    {
      questionId: 4,
      answerContent: 'Banana',
      correct: false
    },
    {
      questionId: 5,
      answerContent: 'It is not calculated yet',
      correct: false
    },
    {
      questionId: 6,
      answerContent: 'B = 80',
      correct: false
    },
    {
      questionId: 7,
      answerContent: 'Function statement',
      correct: false
    },
    {
      questionId: 8,
      answerContent: 'Fault',
      correct: false
    },
    {
      questionId: 9,
      answerContent: 'Conditional statement',
      correct: false
    },
    {
      questionId: 10,
      answerContent: 'Javascript Object Nintendo',
      correct: false
    }
  ])
  await UserAnswer.bulkCreate([
    {
      answerId: 4,
      userId: 1,
      correct: true
    },
    {
      answerId: 2,
      userId: 1,
      correct: true
    },
    {
      answerId: 4,
      userId: 1,
      correct: true
    },
    {
      answerId: 3,
      userId: 1,
    },
    {
      answerId: 2,
      userId: 1,
    },
    {
      answerId: 2,
      userId: 1,
    },
    {
      answerId: 1,
      userId: 1, 
    },
    {
      answerId: 3,
      userId: 1,
    },
    {
      answerId: 3,
      userId: 1,
    },
    {
      answerId: 3,
      userId: 1,
    },
  ])
})
.catch(console.error)

app.use(corsMiddleware)
app.use(jsonParser)
app.use(answersRouter)
app.use(questionRouter)
app.use(userAnswersRouter)
app.use(categoryRouter)
app.use(userRouter)
app.use(login)

function onListen() {
  console.log(`Server running on port ${port}`)
}

app.listen(port, onListen)