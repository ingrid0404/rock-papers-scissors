const ROCK = 'Rock'
const PAPER = 'Paper'
const SCISSORS = 'Scissors'

const choicesArray = [ROCK, PAPER, SCISSORS];

let score = [0, 0];
const scoreDisplay = document.getElementsByClassName("score");
scoreDisplay[0].innerHTML = score[1];
scoreDisplay[1].innerHTML = score[0];

const pcWeapon = document.querySelector("div.pc > div.weapon").querySelectorAll('button')[0];
pcWeapon.innerHTML = "Computer's choice"


const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener("click", playRound);

});

function playRound(event) {

    const userSelection = event.currentTarget.id;
    const computerChoice = getComputerChoice();

    const pcWeapon = document.querySelector("div.pc > div.weapon").querySelectorAll('button')[0];
    pcWeapon.innerHTML = "Computer's choice " + computerChoice;

    let intermediateScore = getRoundScore(computerChoice, userSelection);

    document.querySelector(".alert").style.opacity = 1;
    document.querySelector(".alert").innerHTML = getWinner(intermediateScore[1], intermediateScore[0]).text;
    document.querySelector(".alert").style.backgroundColor = getWinner(intermediateScore[1], intermediateScore[0]).color;


    score = score.map(function (num, idx) {
        return num + intermediateScore[idx];
    });

    scoreDisplay[0].innerHTML = score[0];
    scoreDisplay[1].innerHTML = score[1];

}

function validateWeapon(input) {
    return choicesArray.includes(input);
}

function validatePlayAgain(input) {
    if (input === 'y' || 'n')
        return true;
    return false;
}

function getComputerChoice() {
    let itemChosedByComputer = choicesArray[Math.floor(Math.random() * choicesArray.length)];
    return itemChosedByComputer;

}

function getWinner(computerScore, userScore) {
    let toReturn = { text: 'You won! Congrats!', color: 'green' };
    if (computerScore === userScore) {
        toReturn = { text: 'Equality', color: 'orange' }
    }

    if (computerScore > userScore) {
        toReturn = { text: 'Computer won!', color: 'red' }
    }

    return toReturn;
}

/*
return [computerScore, userScore]
*/
function getRoundScore(computerChoice, userChoice) {
    if (computerChoice === userChoice)
        return [0, 0];

    switch (userChoice) {
        case ROCK: {
            if (computerChoice === SCISSORS)
                return [0, 1];
            if (computerChoice === PAPER)
                return [1, 0];
            break;
        }
        case PAPER: {
            if (computerChoice === SCISSORS)
                return [0, 1];
            if (computerChoice === ROCK)
                return [1, 0]
            break;
        }
        case SCISSORS: {
            if (computerChoice === PAPER)
                return [0, 1];
            if (computerChoice === ROCK)
                return [1, 0]
            break;

        }
        default: break;
    }
}

function playGame() {

    let playAgain = true;
    let score = [0, 0];

    while (playAgain) {

        const input = prompt("Choose your weapon");

        if (validateWeapon(input)) {

            const computerChoice = getComputerChoice();
            console.log("Computer has chosen: " + computerChoice);
            let intermediateScore = getRoundScore(computerChoice, input);

            score = score.map(function (num, idx) {
                return num + intermediateScore[idx];
            });
            console.log('intermediate score: ' + score);


        } else {
            console.log("Invalid weapon");
            console.log("Choose from: ")
            console.log(choicesArray.toString());
        }

        let userPlayAgain = prompt("Play again? (y/n)");

        if (validatePlayAgain(userPlayAgain)) {
            if (userPlayAgain === 'y')
                playAgain = true;
            if (userPlayAgain === 'n')
                playAgain = false;
        }
        else
            playAgain = false;
    }

    console.log('Game has ended. Score:');
    console.log('Computer: ' + score[0]);
    console.log('Player: ' + score[1]);
    console.log("Winner is:")
    console.log(getWinner(score[0], score[1]));

}


/*
Start the game
*/
//playGame();