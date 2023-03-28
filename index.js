const ROCK = 'Rock'
const PAPER = 'Paper'
const SCISSORS = 'Scissors'

const choicesArray = [ROCK, PAPER, SCISSORS];

function validateWeapon(input){
    return choicesArray.includes(input);
}

function validatePlayAgain(input) {
    if(input === 'y' || 'n')
        return true;
        return false;
}

function getComputerChoice() {
    let itemChosedByComputer = choicesArray[Math.floor(Math.random()*choicesArray.length)];
    return itemChosedByComputer;

}

function getWinner(computerScore, userScore) {
    if(computerScore === userScore)
        return 'Equality';
    if(computerScore > userScore)
        return 'Computer!';
    else return 'You won! Congrats!';
}

/*
return [computerScore, userScore]
*/
function getRoundScore(computerChoice, userChoice) {
    if(computerChoice === userChoice)
        return [0,0];

    switch(userChoice) {
       case ROCK: {
            if(computerChoice === SCISSORS)
                return [0,1];
            if(computerChoice === PAPER)
                return [1,0];
            break;
        }
        case PAPER:{
            if(computerChoice === SCISSORS)
                return [0,1];
            if(computerChoice === ROCK)
                return [1,0]
            break;
        }
        case SCISSORS:{
            if(computerChoice === PAPER)
                return [0,1];
            if(computerChoice === ROCK)
                return [1,0]
            break;

        }
        default:break;
        }
}

function playGame(){
    
    let playAgain = true;
    let score = [0,0];

    while(playAgain) {

        const input = prompt("Choose your weapon");

        if(validateWeapon(input)) {

            const computerChoice = getComputerChoice();
            console.log("Computer has chosen: " + computerChoice);
            let intermediateScore = getRoundScore(computerChoice, input);
         
            score = score.map(function (num, idx) {
                return num + intermediateScore[idx];
            });
            console.log('intermediate score: '+ score);
        

        } else {
            console.log("Invalid weapon");
            console.log("Choose from: ")
            console.log(choicesArray.toString());
        }

        let userPlayAgain = prompt("Play again? (y/n)");
    
        if(validatePlayAgain(userPlayAgain)){
            if(userPlayAgain === 'y')
                playAgain = true;
            if(userPlayAgain === 'n')
                playAgain = false;
        }
        else 
            playAgain = false;
    }

    console.log('Game has ended. Score:');
    console.log('Computer: '+ score[0]);
    console.log('Player: '+ score[1]);
    console.log("Winner is:")
    console.log(getWinner(score[0], score[1]));

}


/*
Start the game
*/
playGame();