 # :man_technologist: Dynamic-Student-Assessment-Server Codaisseur :woman_technologist:

 ## This server has been developed for the Dynamic-Student-Assessment test applied by Codaisseur to candidates wishing to join the academy.

 ## Project Overview:

_The Dynamic-Student-Assessment is a project for Codaisseur. The aim is to accurately measure the level of Javascript of potential students who sign up for the coding bootcamp. Better assessments of students Javascript level before they start the course, should increase the Bootcamp completion rate. 
 
The test aims to measure students current level of Javascript and give recommendations based on the results. The questions should change in complexity based on the provided student answers and level_ . 
 
-Test Client: https://github.com/Official-Codaisseur-Graduate/Dynamic-Student-Assessment-Test-Client

Focuses on the applicant UI and contains the login page and admissions test.
 
-Admin Client: https://github.com/Official-Codaisseur-Graduate/Dynamic-Student-Assessment-Admin-Client

Portal for the Codaisseur admissions team to manage applicants, scores and tests.
 
-Server: https://github.com/Official-Codaisseur-Graduate/Dynamic-Student-Assessment-Server

Contains the end points and database models.

## SET UP PROJECT:

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

## TESTING:

To add some dummy data to your database, you can use our database import existent in the index.js.

If you are currently running nodemon with the command, mentioned above, `nodemon index`, the dummy data will be automatically added to your database, otherwise, you can simply run `node index` in your terminal.

**IMPORTANT:** In order not to execute any testings in the database,make sure to comment out the bulk creation in `index.js`, from line 22 up to line 792. Make sure that you have have set:

```.sync({force: false})```

In lines 22 in `index.js` and in line 12 of `db.js`.

## Adaptive-Question-Algorithm

Currently the algorithm takes a UserAnswer, checks if its related Answer is correct. If it is, the newLevel will be raised by 1. If not, it will output the initialLevel. 
The algorithm is currently only being used in the GET endpoint that responds with a new question (so the new question is based on the previous UserAnswer).
