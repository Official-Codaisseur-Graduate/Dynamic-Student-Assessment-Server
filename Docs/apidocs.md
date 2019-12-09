# Dynamic-Student-Assessment-Server Codaisseur

## API DOCS:

The following endpoints are:

## Set Up Database URL:

For this project we have used Postgres with a docker container. In line 3 of `db.js` you can use the variable databaseUrl to change the Postgres address of your preference.

```
const databaseUrl =
 process.env.DATABASE_URL ||
 'postgres://postgres:secret@localhost:5432/postgres';
```

## Database Schema

ONE TO MANY RELATION
Category => Question => Answer
Interviewee => Test

Category has many Question
There are categories of questions,
for example category "variable" has question "What is a variable"

Question has many Answer

question has multiple answers, only one is true
for example question "What is a variable" has answer "An element that stores something" which is true

Interviewee has many Test
an interviewee start doing a test that belongs to this interviewee

MANY TO MANY RELATION
test <=> response <=> answers

Test has and belongs to many Answer through response
Answer has and belongs to many Test through response
Response is a joint table of Test Answer Relations.
It is also a Model of itself

## Response

**POST**
Most Important Endpoint for the App

// when interviewee selected an answer for a test
// send http post "baseUrl/response?testId=id&answerId=id"
// it is going to find all the answers in the test,
// -if there is already an answer to the same question, replace the answer
// -else add the answer
// after add the answer, response with a new question, that is of the new level and
// is not a question already in the test

## Admin

email|password
user accounts for admin client

**POST** Route for creating an admin while signin up
router.post("/admin")

## Interviewee

email
interviewee account
**POST**

router.post("/interviewee")
**GET**

router.get("/interviewee")
query params ?page=&per_page=


## Test

Test table has score|status|code coloumns


**POST**

router.post("/test")

query params ?intervieweeId=

generate new login code for the interviewee and create new test 

**GET**

router.get("/test/:code")

get test related to the interviewee generated code

**PUT**

router.put("/test/:code")

update the test row in the Test table


**PUT**

router.put("/testscore/:id")

in this PUT route we are calculating the score depending on the quetion level 

if question level 0 add 1 point to the score
if question level 1 add 2 point to the score
if question level 2 add 3 point to the score


**GET**

router.get("/test-result/:intervieweeId")

get test info for specific interviewee from it's id


-

## Category:

-The Category model has one attribute 'topic', being a string. It can represent a topic of Javascript as a computer language, such as: functions, objetcs, variables, loops, if statements, etc.

**GET**: You can send a http request to the endpoint
'/category' to read all the topics in category, with their respective 'id'. The pagination's limit is set to 25 but it can be changed by the query itself, using request.query.limit/offset.

**POST**: You can send a post request to '/category', the request.body will be a 'topic'. A post request to '/category' automatically generates a 'createdAt' and 'updatedAt' time stamp.

**PUT**: You can send update requests to '/category/:id'.

**DELETE**: You can send delete requests to '/category/:id'.

## Question:

-The Question model has the following attributes: i) "content", the question in itself, it's text/string; ii) 'initialLevel', a number that represents how hard is that question.

**GET**: You can send an http request to the endpoint
'/question' to read all the questions, with their respective 'id'. The pagination's limit is set to 25 but it can be changed by the query itself, using request.query.limit/offset.

Response Sample:

```
[
    {
        "calculatedLevel": null,
        "categoryId": null,
        "content": "What is the correct way of declaring a consistent variable in JS?",
        "createdAt": "2019-10-22T11:41:25.141Z",
        "id": 1,
        "initialLevel": 2,
        "updatedAt": "2019-10-22T11:41:25.141Z"
    }
]
```

**PUT**: You can send update requests to '/question/:id'.

**DELETE**: You can send delete requests to '/question/:id'.

**POST**: You can send a post request to '/question', the request.body will be take a 'content' a 'initialLevel' number, and a categoryId, which is the category's primary key. A post request to '/question' automatically generates a 'createdAt' and 'updatedAt' time stamp.

**RELATIONS:**

1. For every 'question' we have several 'answers', that can be either true or false.
2. Each question belongs to a specific 'category' of questions.
3. Answers belong to Questions.

## Answer

-The Answer model belongs to Question and has as attributes the following: i) content, which is a string, ii) a questionId, indicating to each question that answer belongs to and iii) correct, which is a boolean, being either true or false.

**POST**: You can send post requests to the endpoint '/answer, being its body composed by a array of datatype answer {answerContent, correct, questionId}

**GET**: A get request to 'answer' will return a list with all the answers, limited to 25 as a standard but it can be changed by the query itself, using request.query.limit/offset.

```
[
    {
        "content": "const number = 10",
        "correct": false,
        "createdAt": "2019-10-22T11:41:38.015Z",
        "id": 1,
        "questionId": 1,
        "updatedAt": "2019-10-22T11:41:38.015Z"
    }
]
```

You can also make **GET** requests to '/answer/question/:id' endpoint to get all the answers for a specific question in the database.

**PUT**: You can send update requests to '/answer/:id'.

**DELETE**: You can send delete requests to '/answer/:id'.
