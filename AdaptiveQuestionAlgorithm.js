function AdaptiveQuestionAlgorithm(answer) {
    let newLevel = 0

    if(answer.answer.correct === true) {
        console.log('THIS ANSWER IS CORRECT')
        newLevel += 1
    }

    //implement
    //check frequency of answer (in)correct
    //check if pattern in answering related to category

    console.log('this is the new level', newLevel)
    return newLevel
}

module.exports = AdaptiveQuestionAlgorithm