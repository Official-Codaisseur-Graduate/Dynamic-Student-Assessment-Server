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
// send http put "baseUrl/response?testId=id&answerId=id"
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

score|status|code
**POST**
router.post("/test")
query params ?intervieweeId=

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


## Succes-Rate-Algorithm

This is some additional information about the function 'succcesRate', which can be found in the _constants.js_ file. This function calculates the percentage of students that answered a specific question correctly (shown in Admin Client) and is used in the /question route. Many-to-many relations were introduced by the first group, and we encountered some problems trying to access the correct data with Sequelize. We ended up using SQL queries to get this function to work, here is a short summary:

1. First the variable _'queryTotalAnswers'_ is created with a query to get the total answers given by students of that particular question (using question id). We use the responses table to get all the given answers. We then define a variable _'resultTotalAnswers'_ where we await the query to be finished. Finally, we create a variable _'totalAnswers'_ where we get the result of totalAnswers as a number. Note here: the response that we wanted, namely the count of the total amount of answers given, was an object in an array, in an array. This means we had to specifically target this with the following statement: 
__resultTotalAnswers[0][0].count__.

2. Then the variable _'queryCorrectAnswers'_ is created to make a SQL query where we get the answers given by students that were correct. Thus, in this query we use the question id again but also check if it was correct: 
__WHERE a."questionId"=${id} AND a."correct"=TRUE__. Again, the count was an object in an array, in an array. 

3. Now that we have those numbers, we can calculate the percentage (in the if statement).

4. Finally, we use this function in the /question route where we map over all the questions. When querying to the database, the question object that is returned has the data from the db under the property dataValues. When the object is send as a response (to the frontend), the server only sends the dataValues property (which has all the data). If we want to send additional data, we can simply add this to the dataValues like so:

``` javascript
    question.dataValues.successRate = await successRate(question.id);
```

