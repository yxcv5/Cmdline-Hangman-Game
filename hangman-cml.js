var inquirer = require("inquirer");
var Word = require("./word.js");
var Letter = require("./letter.js");

var wordList = ["Jimi Hendrix", "Eric Clapton", "Jackson Browne", "Gary Moore",
                    "Chet Baker", "Nina Simone"];
var wins;
var losses;

inquirer.prompt([
    {
      type: "confirm",
      message: "Want to play a Hangman game about American musicians?",
      name: "confirmPlay",
      default: true
    }]).then(function(answer) {
    	if(answer.confirmPlay)
    		startGame();
    	else
    		console.log("Maybe you will change your mind later ...\n");
    });


function startGame() {
	wins = 0;
	losses = 0;
    var word = new Word(wordList);

    guessWords(word);
}


function guessWords(word) {
	var currentWord = word.getCurrentWord();

		var guesses_remaining = 10;
        var letters = [];
		var letterArr = currentWord.split("");
        for(var i=0; i<letterArr.length; i++) {
    	    letters.push(new Letter(letterArr[i]));
    	}

    	var guessArr = [];
        letters.forEach(function(lett) {
        	guessArr.push(lett.back); 
        });

        var guessed = [];
        guessLetters(word, guesses_remaining, currentWord, guessArr, letters, guessed);
        
}

function summary(playAgain) {

    console.log("Here is a summary of your results: \n")
    console.log("You've guessed " + wins + " words correctly!\n");
    console.log("You've missed " + losses + " words \n");

    if(playAgain) {
    	inquirer.prompt([
        {
        	type: "confirm",
        	message: "Want to play again?",
            name: "confirmPlay",
            default: true
        }]).then(function(answer) {
        	if(answer.confirmPlay)
    		    startGame();
    	    else 
    		    return;
        });
    }
}


function next(word) {
	if(word.wordList.length > 0) {
        inquirer.prompt([
        {
        	type: "confirm",
            message: "Next word?",
            name: "confirm",
            default: true
        }]).then(function(answer) {
        	if(answer.confirm)
        		guessWords(word);
    	    else
    	    	summary(false); 		    
        });
    }
    else {
      	summary(true);
    }
}

function guessLetters(word, guesses_remaining, currWord, guessArr, letters, guessed) {

		inquirer.prompt([
		{
			name: "letter",
			message: "Guess a letter!"
		}]).then(function(guess) {
			// console.log(guessed);
			var playerLetter = guess.letter.toLowerCase();
			if(guessed.includes(playerLetter)) {
    			console.log("You guessed " + playerLetter + "\n");
                guessLetters(word, guesses_remaining, currWord, guessArr, letters, guessed);
    		}
    		else {
                guessed.push(playerLetter);            

            if(currWord.toLowerCase().includes(playerLetter)) {
            	updateGuess(guessArr, letters, playerLetter);
            	console.log(guessArr.toString().replace(/,/g, " "));
            	if(guessArr.indexOf("_") > -1) {
            		console.log("CORRECT!!!\n");
            	    guessLetters(word, guesses_remaining, currWord, guessArr, letters, guessed);
                }
                else {
                	console.log("You got it right!\n");
                    wins++;
                    next(word);
                }
            }
            else {
            	console.log(guessArr.toString().replace(/,/g, " "));
                console.log("INCORRECT!!!\n");
                guesses_remaining--;
                if(guesses_remaining>0) {
                    console.log(guesses_remaining + " guesses remaining!!! \n");
                    guessLetters(word, guesses_remaining, currWord, guessArr, letters, guessed);
                }
                else {
                	console.log("You have reached the maximum number of guesses!");
                	losses++;
                	next(word);
                }
            }
            }            
		});
	 
}


function updateGuess(guessArr, letters, playerletter) {

    for(var i =0; i<guessArr.length; i++) {
    	if(guessArr[i] === "_") {
    		if(letters[i].front.toLowerCase()===playerletter)
    			guessArr[i] = letters[i].front;
        }
    }        
}