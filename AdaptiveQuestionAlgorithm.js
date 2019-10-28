function AdaptiveQuestionAlgorithm(givenAnswer) {
    let newLevel = 0
    if(givenAnswer !== null) {
        if(givenAnswer.answer.correct === true) {
            console.log('THIS ANSWER IS CORRECT')
            newLevel += 1
        }

        //check if pattern in answering related to category

        console.log('this is the new level', newLevel)
    }
    return newLevel
}

module.exports = AdaptiveQuestionAlgorithm