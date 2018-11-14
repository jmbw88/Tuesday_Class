var wordList = ["dylan", "stacy", "joseph", "enrique"];
var guessesRemaining = 10;
var guesses = [];
var wins = 0;
var losses = 0;
var currentWord = "";
var partialWord = "";
var gameRunning = false;

function newGame() {
    gameRunning = true;
    guessesRemaining = 10;
    guesses = [];
    partialWord = "";
    document.getElementById("result").textContent = "Press any key to guess a letter!";
    document.getElementById("yoda").style.visibility = "hidden";
    pickWord();
    updateDisplay();
}

function pickWord() {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(currentWord);
    buildPartial();
}

function buildPartial() {
    for(var i = 0; i < currentWord.length; i++) {
        partialWord = partialWord.concat("_");
    }
    console.log(partialWord);
}

function updatePartial(letter) {
    var indices = [];
    for(var i = 0; i < currentWord.length; i++) {
        if(currentWord.charAt(i) === letter) {
            indices.push(i);
        }
    }
    console.log(indices);

    for(var i = 0; i < indices.length; i++) {
        partialWord = partialWord.substr(0, indices[i]) + letter + partialWord.substr(indices[i] + letter.length);
    }
    console.log(partialWord);
}

function test(letter) {
    if(letter.match(/[a-z]/i) && letter.length === 1 && gameRunning) {
        // console.log(letter + " is a letter");
        if(!guesses.includes(letter)) {
            guesses.push(letter);
            if(currentWord.includes(letter)) {
                // console.log(currentWord + " contains " + letter);
                updatePartial(letter);

                if(currentWord === partialWord) {
                    document.getElementById("result").textContent = "You won! The word was " + currentWord;
                    document.getElementById("yoda").style.visibility = "visible";
                    wins++;
                    // newGame();
                    gameRunning = false;
                }
            }
            else {
                guessesRemaining--;
                //if we lost
                if(guessesRemaining <= 0) {
                    document.getElementById("result").textContent = "You lost! The word was " + currentWord;
                    losses++;
                    // newGame();
                    gameRunning = false;
                }
            }
            updateDisplay();
        }
    }
}

function updateDisplay() {
    document.getElementById("partialWord").textContent = partialWord;
    document.getElementById("guesses").textContent = guesses;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    
}

window.onload = function() {
    newGame();

    document.onkeyup = function(event) {
        console.log(event.key);
        test(event.key.toLowerCase());
    }

    document.getElementById("newGame").addEventListener("click", newGame);
}