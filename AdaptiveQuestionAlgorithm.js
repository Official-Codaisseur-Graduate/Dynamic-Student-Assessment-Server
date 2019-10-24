function AdaptiveQuestionAlgorithm(givenAnswer) {
    let newLevel = 0

    // console.log('THIS IS THE GIVENANSWER', givenAnswer)
    // console.log('THIS IS THE GIVENANSWER.ANSWER', givenAnswer.answer)
    console.log('THIS IS THE GIVENANSWER.ANSWER.CORRECT', givenAnswer.answer.correct)

    if(givenAnswer.answer.correct === true) {
        console.log('THIS ANSWER IS CORRECT')
        newLevel += 1
    }

    // implement
    // check frequency of answer (in)correct
    // check if pattern in answering related to category

    console.log('this is the new level', newLevel)
    return newLevel
}

module.exports = AdaptiveQuestionAlgorithm