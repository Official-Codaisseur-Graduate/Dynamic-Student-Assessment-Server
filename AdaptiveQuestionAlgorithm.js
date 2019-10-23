function AdaptiveQuestionGenerator(answer) {
    let newLevel = 0
    // let totalAnswers = answer.totalAnswers    
    // let correctAnswers = []
    // let inCorrectAnswers = []
    // let score = correctAnswers.length / totalAnswers 
    // let categoryPattern = false 
    
    //check if (in)correct
    if(answer.correct === true) {
        //do something
        newLevel++
    }

    //check frequency of answer (in)correct
    //check if pattern in answering related to category

    //returns an array with questions with new level of difficulty
    return newLevel
}









module.exports = AdaptiveQuestionAlgorithm