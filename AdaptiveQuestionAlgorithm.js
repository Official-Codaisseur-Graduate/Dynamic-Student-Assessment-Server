function AdaptiveQuestionAlgorithm(givenAnswer) {
    let newLevel = 0
    if(givenAnswer !== null) {
        if(givenAnswer.answer.correct === true) {
            newLevel += 1
        }
        //implement more depth in this algorithm

        console.log('this is the new level', newLevel)
    }
    return newLevel
}

module.exports = AdaptiveQuestionAlgorithm