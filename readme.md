 # Dynamic-Student-Assessment-Server Codaisseur

 ## This server has been developed for the Dynamic-Student-Assessment test applied by Codaisseur to candidates wishing to join the academy

 In order to successfully use this server, you must install the following node_modules:

 - ExpressJs
 - Sequelize 
 - Postgres (including a local postgres server - Docker Postgres, for instance)
 - Cors 
 - JSON Body-Parser
 - Bcrypt

 In your terminal, run the following commands (we developed the project using 'npm'):

 `npm init -y`
 `npm i body-parser`
 `npm i express`
 `npm i sequelize`
 `npm i pg`
 `npm i cors`
 `npm i nodemon`
 `npm i bcrypt`

 To start the terminal with nodemon, use the following command:

 `nodemon index`
 
 To start the code without tracking saved changes, you can simply run:

 `node index`

 As a standard we are using port 4000 for this server.

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
'/question' to read all the topics in category, with their respective 'id'. The pagination's limit is set to 25 but it can be changed by the query itself, using request.query.limit/offset. 

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
1) For every 'question' we have several 'answers', that can be either true or false.
2) Each question belongs to a specific 'category' of questions.
3) Answers belong to Questions.

## Answer

-The Answer model belongs to Question and has as attributes the following: i) content, which is a string, ii) a questionId, indicating to each question that answer belongs to and iii) correct, which is a boolean, being either true or false.

**POST**: You can send post requests to the endpoint '/answer/, being its body composed by a text 'content',a boolean indicating whether it's true or false and a questionId. A post request to '/answer' automatically generates a 'createdAt' and 'updatedAt' time stamp.

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

## UserAnswer:

-The UserAnswer model connects the previous models together, taking a userId, part of a User model, included here, that takes a password, username and e-mail. 

**RELATIONS:**

1) UserAnswer belongs to Answer
2) UserAnswer, then, belongs to Question.

**POST**: You can send post requests with a UserAnswer to '/userAnswers', containing all the necessary user, answer and question ids.

**GET**: The endpoint '/userAnswer' will return a list of userAnswers also limited to 25. You may also send a request to a specific userAnswer by id.

**PUT**: You can send update requests to '/userAnswer/:id'.

**DELETE**: You can send delete requests to '/userAnswer/:id'.

## User:

-The user model currently receiving three different attributes: i) username, ii) email and iii) password, being the last one encrypted by Bcrypt.

You can perform two different types of requests to the '/user' endpoint:

**POST:** You can post a new user containing an email, password and username as body.
 
**GET:** A sample get request to the '/user' endpoint will look like:

```
[
    {
        "createdAt": "2019-10-22T13:31:19.763Z",
        "email": "rein@codaisseur.com",
        "id": 1,
        "password": "$2b$10$nC4AK41sB8Igsu/fB86eueAl0xK2FpcwjrZZ1F8Ui3Y2jG4459ECG",
        "updatedAt": "2019-10-22T13:31:19.763Z",
        "username": "Rein"
    }
]
```

## Dummy Data:

To add some dummy data to your database, you can checkout to the branch 'testing', using the following git command:

```
git checkout dummy-data-testing
```

If you are currently running nodemon with the command, mentioned above, `nodemon index`, the dummy data will be automatically added to your database, otherwise, you can simply run `node index` in your terminal. 












