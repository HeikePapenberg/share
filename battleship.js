/**
This program creates a board of 3x3, consisting of three arrays nested into one 
meta-array.
[[0,0 0,1 0,2], 
[1,0 1,1 1,2],
[2,0 2,1 2,2]]
It requires the user to choose a field inside this nested array three times 
and compares that to the value given. If both are the same, the battleship is 
hit and the user wins. If it has not been hit after three attempts, the user 
loses the game.
*/

// Gets module readline-sync.
let readlineSync = require('readline-sync');
 
// Ask the user for their player name.
let userName = readlineSync.question('Enter player name: ');
console.log(`Welcome ${userName}!`);

// Creates the board for the player.
const board = [];
const rowCount = 3;
const colCount = 3;

// Adds a row.
for (let i = 0; i < rowCount; ++i) {
    board.push([]);                         // runs rowCount times and inserts 
    // Adds a column.                       // an empty array
    for (let j = 0; j < colCount; ++j) {
        board[i].push(' ');                 // repeats colCount times and inserts 
    }                                       // string '?' at the end of the current 
                                            // array
}

// Prints out board row by row.
for (let i = 0; i < rowCount; ++i) {
    console.log(board[i]);                  // gets first nested array, second 
}                                           // nested array, third nested array 

// Asks user to guess a certain number of times.
const maxGuesses = 3;
let userGuessesRemaining = maxGuesses;

// Places ship randomly.
const shipRow = Math.floor(Math.random() * rowCount);   // Math.floor() rounds down
const shipCol = Math.floor(Math.random() * colCount);   // Math.random() float 
                                                        // between 0 and 1
                                                        // --> 0.001 * row --> 0
                                                        // --> 0.999 * row --> row - 1
// board[shipRow][shipCol] = 'S';                       // S marks ship

// Loops until game is over.
while (userGuessesRemaining > 0) {

    console.log(`Guesses remaining: ${userGuessesRemaining}`);

    // Asks the user for their next move.
    let nextMove = readlineSync.question(
        `Enter your next move: ("1 2" means row 1, column 2) `
    ).split(' ');                           // splits the input at given symbols 
                                            // into an array

    // Extracts guesses to something we can use for array indexing.
    let rowGuess = +nextMove[0];            // + converts from string to number
    let colGuess = +nextMove[1]; 
    
    // Checks if user hit the ship.
    const hitShip = rowGuess === shipRow && colGuess === shipCol;   // true or false

    if (hitShip) {
        console.log('You hit the ship!');

        // Marks the user's successful guess on the board.
        board[rowGuess][colGuess] = 'S'; 
    }
    // Tells user they missed.
    else {
        console.log('Aww, you missed.');

        // Marks the user's missed guess on the board.
        board[rowGuess][colGuess] = 'X';        // accesses array[i][j]
                                                // for nested Objects in JavaScript, 
                                                // add access consecutively ([] or .)
    
                                                // throws an error when going out of bounds 
                                                // for rowGuess as it ends up being  
                                                // undefined[index] and it cannot 
                                                // access an undefined object 
    }
    
    // Prints out board row by row.
    for (let i = 0; i < rowCount; ++i) {
        console.log(board[i]); 
    } 

    // Finishes game if ship was hit.
    if (hitShip) {
        break;
    }


    // Turn is over, decrement guess.
    --userGuessesRemaining;
}

// Checks if the user has guesses remaining to see if they won.
if (userGuessesRemaining > 0) {             // if break statement is reached 
    console.log('Woohoo! You won.');        // userGuessesRemaining stays above 0
}
else {                                      // if break statement is never reached
    console.log('You lost.');               // userGuessesRemaining gets decremented 
                                            // all the way to 0
    
    // Marks ship to show user where it was.
    board[shipRow][shipCol] = 'S';            // S marks ship    
    
    // Prints out board row by row.
    for (let i = 0; i < rowCount; ++i) {
        console.log(board[i]); 
    } 
}                                           