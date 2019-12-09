 # :man_technologist: Dynamic-Student-Assessment-Server Codaisseur :woman_technologist:

 ## This server has been developed for the Dynamic-Student-Assessment test applied by Codaisseur to candidates wishing to join the academy.

 ## Project Overview:

The Dynamic-Student-Assessment is a project for Codaisseur. The aim is to improve the measurement of the level of knowledge of Javascript of future students prior to the bootcamp. By making the test adaptive, it provides a more accurate analysis of a students’ current level of Javascript.  By adaptive we mean that the test is dynamic. The questions change, based on the answering behaviour of the student. The final results of the test will provide more precise and personal recommendations for preparing for the academy and consequently increase the graduation rate.

## Related repos
 
- Test Client: https://github.com/Official-Codaisseur-Graduate/Dynamic-Student-Assessment-Test-Client

That focuses on the applicant UI and contains the login page and admissions test.
 
- Admin Client: https://github.com/Official-Codaisseur-Graduate/Dynamic-Student-Assessment-Admin-Client

Portal for the Codaisseur admissions team to manage applicants, scores and tests.
 
- Server: https://github.com/Official-Codaisseur-Graduate/Dynamic-Student-Assessment-Server

Which contains the end points and database models. (you are here!)

### For more information about the endpoints and routers. Check our API docs `apidocs.js` in the ./docs folder.

## SET UP PROJECT:

1. Clone this repo 

`git clone https://github.com/Official-Codaisseur-Graduate/Dynamic-Student-Assessment-Server`

2. In your terminal, run the following command to install all the dependencies

```
npm install
```

3. To start the terminal with nodemon, use the following command (assumes nodemon is installed globally)

```
nodemon index
```
 
4. To start the code without tracking saved changes, you can simply run:

```
node index
```

As a standard we are using port 4000 for this server.


## TESTING:

To add some dummy data to your database, you can use our database import existent in the index.js.

As the password is bcrypted in the database, You can use email: middletonhicks@assistix.com and password: Brainclip for logging in on the Admin-Client.

If you are currently running nodemon with the command, mentioned above, `nodemon index`, the dummy data will be automatically added to your database, otherwise, you can simply run `node index` in your terminal.

**IMPORTANT:** :exclamation: In order not to execute any testings in the database, make sure to comment out the bulk creation in `index.js`, from line 30 up to line 36. Make sure that you have have set:

```.sync({force: false})```

In lines 27 in `index.js`.

## Score:

The main score calculation is based on the correct answers and question level see Test Router explanation in the **[apidocs.md](https://github.com/Official-Codaisseur-Graduate/Dynamic-Student-Assessment-Server/blob/development/Docs/apidocs.md)** 


**Important note!** :exclamation:

When a student answers a question, the following happens in the backend:

1. A post request to /response/ is made (currently in the req.query we expect an answerId and an TestId  which we can use in the backend). 

2. In the case of the first question of the test, obviously there is no answerId yet to update. The logic behind the solution for this problem is that in this case we create answerId which has value of null if there's no answer yet inside of the post endpoint

3. After this, a POST request is made to a new question. It looks at the previousAnswer, which we just provided. It runs through the algorithm and returns a new question. 

## Adaptive-Question-Algorithm

Currently the algorithm takes a UserAnswer/answerId, checks if its related Answer is correct. If it is, the newLevel will be raised by 1. If not, it will be decreased by 1. If you are at the max level(2) and the answer is correct, the level stays level(2), if not the level will be decreased by 1. If you are at level 0 and the answer is incorrect, the level stays at level(0). If correct the level will be raised by 1.

The algorithm is currently only being used in the POST response endpoint that responds with a new question (so the new question is based on the previous UserAnswer/answerId).

## Server Contributors:

Lucas Pascholatti:

-Github: https://github.com/LPascholatti

-Linkedin: https://www.linkedin.com/in/pascholatti/

Zeger de Vos:

-Github: https://github.com/zegenerative

-Linkedin: https://www.linkedin.com/in/zegerdevos/

Adel Tancsik:

-Github: https://github.com/adeltancsik

Veronica H. Stigen:

-Github: https://github.com/vhs2708

Melissa 't Hart:

-Github: https://github.com/MelissaDTH

Mouaz Tabnja:

-Github: https://github.com/mtabanja

## Dynamic-Student-Assessment-Contributors:

#### Special thanks to:
Class 30:

- **[Ivana H](https://github.com/future-ruins)**
- **[Gerson Lynch](https://github.com/gersly)**
- **[Zeger de Vos](https://github.com/zegenerative)**
- **[Esther Hayward](https://github.com/eawh02)**
- **[Lucas Pascholatti](https://github.com/LPascholatti)**
- **[Andrea Cogo](https://github.com/anderara)**

Class 31: 

- **[KumKum Singh](https://github.com/kumkumsingh)**
- **[Yu Qi](https://github.com/qiyu1987)**
- **[Stijn Blokker](https://github.com/stijnblokker)**
- **[Evelina Wahlström](https://github.com/evelinawahlstrom)**
- **[Sushmita BS](https://github.com/sushmitha-b-s)**

Class 32:

- **[Melissa 't Hart](https://github.com/MelissaDTH)**
- **[Adel Tancsik](https://github.com/adeltancsik)**
- **[Mouaz Tabanja](https://github.com/mtabanja)**
- **[Veronica H. Stigen](https://github.com/vhs2708)**
