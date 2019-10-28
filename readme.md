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

## Dummy Data:

To add some dummy data to your database, you can checkout to the branch 'testing', using the following git command:

```
git checkout dummy-data-testing
```

If you are currently running nodemon with the command, mentioned above, `nodemon index`, the dummy data will be automatically added to your database, otherwise, you can simply run `node index` in your terminal. 

## Adaptive-Question-Algorithm

The Adaptive Question Algorithm works in two different .js files. The first is 'AdaptiveQuestionAlgorithm', which takes as a parameter the 'givenAnswer' from a userId into the database. Each given answer, if correct, will return a higger level to questions provided to the user. Which returns a 'newLevel' to the starter 'initialLevel'.



