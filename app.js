//caching the dom - improves performance because variable points directly to element instead of using functions that need to look through the DOM
//use IDs for Javascript??

let userScore = 0; 
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

let FPS = 30;
let imgNum = 7;
let computerCounter = 0;
let imgCounter = imgNum; 
let active = false;
let finalChoiceNum = 0;
let userChoice = ""; 

setInterval(update, 1000 / FPS);
main();

function update(){
    if (active == true){
        computerCounter++;
        if (computerCounter > 8){
            randomNumber = Math.floor((Math.random() * 3));   
            changeImageBasedOnNumber(randomNumber);
            computerCounter = 0;
            if (imgCounter > 1){
                document.getElementById("computer-image").classList.add("blue-glow");
                setTimeout(function(){document.getElementById("computer-image").classList.remove("blue-glow") }, 60);
            }
            imgCounter--;
            if (imgCounter <= 0){
                active = false;
                imgCounter = imgNum; 
                computerCounter = 0;
                finalChoiceNum = randomNumber;
                gameOutcome(userChoice);
            }
        }
    }
}

function changeImageBasedOnNumber(number){
    if (number < 1){
        document.getElementById("computer-image").src = "/Rock_Paper_Scissors_Game/images/rock.png";
    } else if (number < 2){
        document.getElementById("computer-image").src = "/Rock_Paper_Scissors_Game/images/paper.jpg";
    } else {
        document.getElementById("computer-image").src = "/Rock_Paper_Scissors_Game/images/scissors.png";
    }
}

function convertToWord(letter){
    if (letter ==="r") return "Rock";
    if (letter ==="p") return "Paper";
    return "Scissors";
}

function gameOutcome(userChoice){
    console.log(userChoice);
    const choices = ['r', 'p', 's'];
    computerChoice = choices[finalChoiceNum];
    switch(userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "sr":
        case "rp":
        case "ps":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "ss":
        case "pp":
            draw(userChoice, computerChoice);
            break;
    }
}

function win(userChoice, computerChoice){
    userScore++;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. You win!"`; 
    flashWithColor(userChoice, 'green-glow');
    flashWithColor("computer-image", 'red-glow');
}

function lose(userChoice, computerChoice){
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)} loses to ${convertToWord(computerChoice)}. You lose!"`; 
    flashWithColor(userChoice, 'red-glow');

    flashWithColor("computer-image", 'green-glow');
}

function draw(userChoice, computerChoice){
    result_p.innerHTML = `${convertToWord(userChoice)} equals ${convertToWord(computerChoice)}. It's a draw!"`; 
    flashWithColor(userChoice, 'grey-glow');

    flashWithColor("computer-image", 'grey-glow');
}

function flashWithColor(IDofElement, color){
    document.getElementById(IDofElement).classList.add(color)
    setTimeout(function(){document.getElementById(IDofElement).classList.remove(color) }, 1500);
}

function main(){  
    rock_div.addEventListener('click', function(){
        if (active == false){
            userChoice = "r";
        }
        active = true;
        
    })

    paper_div.addEventListener('click', function(){
        if (active == false){
            userChoice = "p";
        }
        active = true;
    })
    
    scissors_div.addEventListener('click', function(){
        if (active == false){
            userChoice = "s";
        }
        active = true;
    })
}
