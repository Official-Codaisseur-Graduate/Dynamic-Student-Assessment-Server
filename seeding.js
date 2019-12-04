const bcrypt = require("bcrypt");
const adminListPlainPassword = [
  {
    email: "middletonhicks@assistix.com",
    password: "Brainclip"
  },
  {
    email: "alexandriamayo@brainclip.com",
    password: "Makingway"
  }
];

const adminListHashedPassword = adminListPlainPassword.map(admin => {
  return {
    ...admin,
    password: bcrypt.hashSync(admin.password, 10)
  };
});

const intervieweeList = [
  {
    email: "websterkirby@eargo.com"
  },
  {
    email: "bertabradley@isosure.com"
  },
  {
    email: "hamsa@gmail.com"
  },
  {
    email: "kiran@gmail.com"
  },
  {
    email: "rohit@gmail.com"
  },
  {
    email: "amar@gmail.com"
  }
];

const categoryList = [
  {
    topic: "Variables"
  },
  {
    topic: "Functions"
  },
  {
    topic: "Global"
  },
  {
    topic: "Logic"
  },
  {
    topic: "Type Coercion"
  },
  {
    topic: "Statements"
  }
];
const questionList = [
  {
    categoryId: 2,
    questionContent: "What is a function?",
    initialLevel: 1
  },
  {
    categoryId: 1,
    questionContent: "What is a variable?",
    initialLevel: 0
  },
  {
    categoryId: 5,
    questionContent: "Let x = 13, b = ‘a’, c = x + b. What is c?",
    initialLevel: 2
  },
  {
    categoryId: 2,
    questionContent:
      "Function banana(a) { console.log(a + ‘world’) } What does this function return?",
    initialLevel: 0
  },
  {
    categoryId: 3,
    questionContent: "Number is undefined’ What does ‘undefined’ mean?",
    initialLevel: 1
  },
  {
    categoryId: 1,
    questionContent:
      "Declare a consistent variable b and assign it the value of 80",
    initialLevel: 0
  },
  {
    categoryId: 6,
    questionContent:
      "What kind of statement is used to execute actions based on a trigger or condition?",
    initialLevel: 2
  },
  {
    categoryId: 1,
    questionContent:
      "What is a JavaScript element that represents either TRUE or FALSE values?",
    initialLevel: 1
  },
  {
    categoryId: 6,
    questionContent:
      "What is the name of the statement that is used to exit or end a loop?",
    initialLevel: 0
  },
  {
    categoryId: 3,
    questionContent: "What does JSON mean?",
    initialLevel: 0
  },
  {
    categoryId: 3,
    questionContent: "Inside which HTML element do we put the JavaScript?",
    initialLevel: 1
  },
  {
    categoryId: 3,
    questionContent: "Where is the correct place to insert a JavaScript?",
    initialLevel: 1
  },
  {
    categoryId: 3,
    questionContent: `What is the correct syntax for referring to an external script called "xxx.js"?`,
    initialLevel: 2
  },
  {
    categoryId: 2,
    questionContent: "How do you create a function in JavaScript?",
    initialLevel: 1
  },
  {
    categoryId: 2,
    questionContent: `How do you call a function named "myFunction"?`,
    initialLevel: 2
  },
  {
    categoryId: 6,
    questionContent: "How to write an IF statement in JavaScript?",
    initialLevel: 1
  },
  {
    categoryId: 6,
    questionContent: `How to write an IF statement for executing some code if "i" is NOT equal to 5?`,
    initialLevel: 1
  },
  {
    categoryId: 1,
    questionContent: "What is the correct way to write a JavaScript array?",
    initialLevel: 1
  },
  {
    categoryId: 5,
    questionContent:
      "How do you round the number 7.25, to the nearest integer?",
    initialLevel: 2
  },
  {
    categoryId: 5,
    questionContent: "What will the following code return: Boolean(10 > 9)",
    initialLevel: 2
  }
];
const answerList = [
  {
    questionId: 20,
    answerContent: "false",
    correct: false
  },
  {
    questionId: 20,
    answerContent: "true",
    correct: true
  },
  {
    questionId: 20,
    answerContent: "NaN",
    correct: false
  },
  {
    questionId: 20,
    answerContent: "null",
    correct: false
  },
  {
    questionId: 19,
    answerContent: "rnd(7.25)",
    correct: false
  },
  {
    questionId: 19,
    answerContent: "Math.rnd(7.25)",
    correct: false
  },
  {
    questionId: 19,
    answerContent: "round(7.25)",
    correct: false
  },
  {
    questionId: 19,
    answerContent: "Math.round(7.25)",
    correct: true
  },
  {
    questionId: 18,
    answerContent: `"var colors = "red", "green", "blue"`,
    correct: false
  },
  {
    questionId: 18,
    answerContent: `"var colors = ["red", "green", "blue"]`,
    correct: true
  },
  {
    questionId: 18,
    answerContent: `"var colors = (1:"red", 2:"green", 3:"blue")`,
    correct: false
  },
  {
    questionId: 18,
    answerContent: `"var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")`,
    correct: false
  },
  {
    questionId: 17,
    answerContent: "if (i != 5)",
    correct: true
  },
  {
    questionId: 17,
    answerContent: "if i <> 5",
    correct: false
  },
  {
    questionId: 17,
    answerContent: "if (i <> 5)",
    correct: false
  },
  {
    questionId: 17,
    answerContent: "if i =! 5 then",
    correct: false
  },
  {
    questionId: 16,
    answerContent: "if i = 5 then",
    correct: false
  },
  {
    questionId: 16,
    answerContent: "if (i==5)",
    correct: true
  },
  {
    questionId: 16,
    answerContent: "if i = 5",
    correct: false
  },
  {
    questionId: 16,
    answerContent: "if i == 5 then",
    correct: false
  },
  {
    questionId: 15,
    answerContent: "call myFunction()",
    correct: false
  },
  {
    questionId: 15,
    answerContent: "call function myFunction()",
    correct: false
  },
  {
    questionId: 15,
    answerContent: "myFunction()",
    correct: true
  },
  {
    questionId: 15,
    answerContent: "myFunction(call)",
    correct: false
  },
  {
    questionId: 14,
    answerContent: "function myFunction()",
    correct: true
  },
  {
    questionId: 14,
    answerContent: "function:myFunction()",
    correct: false
  },
  {
    questionId: 14,
    answerContent: "function = myFunction()",
    correct: false
  },
  {
    questionId: 14,
    answerContent: "function is myFunction()",
    correct: false
  },
  {
    questionId: 13,
    answerContent: `<script name="xxx.js">`,
    correct: false
  },
  {
    questionId: 13,
    answerContent: `<script src="xxx.js">`,
    correct: true
  },
  {
    questionId: 13,
    answerContent: `<script href="xxx.js">`,
    correct: false
  },
  {
    questionId: 13,
    answerContent: `<script link="xxx.js">`,
    correct: false
  },
  {
    questionId: 12,
    answerContent: "Both the <head> section and the <body> section are correct",
    correct: true
  },
  {
    questionId: 12,
    answerContent: "The <head> section",
    correct: false
  },
  {
    questionId: 12,
    answerContent: "The <body> section",
    correct: false
  },
  {
    questionId: 12,
    answerContent: "Either in <head> or <body>, but not in both",
    correct: false
  },
  {
    questionId: 11,
    answerContent: "<js>",
    correct: false
  },
  {
    questionId: 11,
    answerContent: "<javascript>",
    correct: false
  },
  {
    questionId: 11,
    answerContent: "<scripting>",
    correct: false
  },
  {
    questionId: 11,
    answerContent: "<script>",
    correct: true
  },
  {
    questionId: 1,
    answerContent:
      "Something that runs an operation and then returns something",
    correct: true
  },
  {
    questionId: 2,
    answerContent: "An element that stores something",
    correct: true
  },
  {
    questionId: 3,
    answerContent: "‘13a’",
    correct: true
  },
  {
    questionId: 4,
    answerContent: "It doesn’t return anything",
    correct: true
  },
  {
    questionId: 5,
    answerContent:
      "Javascript does not know what ‘number’ is. It is not defined anywhere.",
    correct: true
  },
  {
    questionId: 6,
    answerContent: "Const b = 80",
    correct: true
  },
  {
    questionId: 7,
    answerContent: "Conditional statement",
    correct: true
  },
  {
    questionId: 8,
    answerContent: "Boolean",
    correct: true
  },
  {
    questionId: 9,
    answerContent: "Break",
    correct: true
  },
  {
    questionId: 10,
    answerContent: "Javascript Object Notation",
    correct: true
  },
  {
    questionId: 1,
    answerContent: "A mathematical equation",
    correct: false
  },
  {
    questionId: 2,
    answerContent: "A number",
    correct: false
  },
  {
    questionId: 3,
    answerContent: "Undefined",
    correct: false
  },
  {
    questionId: 4,
    answerContent: "hello world’",
    correct: false
  },
  {
    questionId: 5,
    answerContent: "It has no value",
    correct: false
  },
  {
    questionId: 6,
    answerContent: "Let b = 80",
    correct: false
  },
  {
    questionId: 7,
    answerContent: "Action statement",
    correct: false
  },
  {
    questionId: 8,
    answerContent: "Variable",
    correct: false
  },
  {
    questionId: 9,
    answerContent: "While loop",
    correct: false
  },
  {
    questionId: 10,
    answerContent: "Jimmy Stocks On Nutella",
    correct: false
  },
  {
    questionId: 1,
    answerContent: "Something useful",
    correct: false
  },
  {
    questionId: 2,
    answerContent: "A string",
    correct: false
  },
  {
    questionId: 3,
    answerContent: "13a",
    correct: false
  },
  {
    questionId: 4,
    answerContent: "aworld",
    correct: false
  },
  {
    questionId: 5,
    answerContent: "It is 0",
    correct: false
  },
  {
    questionId: 6,
    answerContent: "Var b = 80",
    correct: false
  },
  {
    questionId: 7,
    answerContent: "Trigger statement",
    correct: false
  },
  {
    questionId: 8,
    answerContent: "If else element",
    correct: false
  },
  {
    questionId: 9,
    answerContent: "Switch statement",
    correct: false
  },
  {
    questionId: 10,
    answerContent: "Jessica Sleeps Over Night",
    correct: false
  },
  {
    questionId: 1,
    answerContent: "Something that works properly",
    correct: false
  },
  {
    questionId: 2,
    answerContent: "Var or let",
    correct: false
  },
  {
    questionId: 3,
    answerContent: "13’a’",
    correct: false
  },
  {
    questionId: 4,
    answerContent: "Banana",
    correct: false
  },
  {
    questionId: 5,
    answerContent: "It is not calculated yet",
    correct: false
  },
  {
    questionId: 6,
    answerContent: "B = 80",
    correct: false
  },
  {
    questionId: 7,
    answerContent: "Function statement",
    correct: false
  },
  {
    questionId: 8,
    answerContent: "Fault",
    correct: false
  },
  {
    questionId: 9,
    answerContent: "Conditional statement",
    correct: false
  },
  {
    questionId: 10,
    answerContent: "Javascript Object Nintendo",
    correct: false
  }
];
const testList = [
  {
    score: 0,
    intervieweeId: 1
  },
  {
    score: 0,
    intervieweeId: 2
  }
];
const responseList = [
  {
    testId: 1,
    answerId: 1
  },
  {
    testId: 2,
    answerId: 1
  }
];
module.exports = {
  adminListHashedPassword,
  intervieweeList,
  categoryList,
  questionList,
  answerList,
  testList,
  responseList
};
