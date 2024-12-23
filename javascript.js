let board = [
    ["", "", ""], 
    ["", "", ""],
    ["", "", ""]   
];

function clearBoard() {
    board = [
        ["", "", ""], 
        ["", "", ""],
        ["", "", ""]   
    ];
}

let isGameOver = false;
let player1;
let player2;

startGame();


function startGame() {
    // make player 1
    const p1Name = "Player 1";
    const sign1 = prompt("Choose X or O").toUpperCase();
    while (sign1 !== "X" && sign1 !== "O") {
        console.log("Invalid input, please choose either X or O");
        sign1 = prompt("Choose X or O").toUpperCase(); 
    }
    player1 = createPlayer(p1Name, sign1);

    // make player 2
    const p2Name = "Player 2"
    let sign2 = "";
    if (sign1 === "X") {
        sign2 = "O";
        console.log("Player 1: X, Player 2: O");
    }
    else {
        sign2 = "X";
        console.log("Player 1: O, Player 2: X");
    }
    player2 = createPlayer(p2Name, sign2);

    checkPlayerTurn();
}


// happens once for first turn, switchTurn() used for subsequent turns
function checkPlayerTurn() {
    const firstSecond = prompt("Who goes first?");

    if (firstSecond === "Player 1" || firstSecond === "player 1") {
        console.log("Player 1 goes first");
        player1();
    } 
    else {
        console.log("Player 2 goes first");
        player2();
    }
}


function createPlayer(name, sign) {
    if (sign === "X" || sign === "O") {
        return function() {
            if (isGameOver === false) {
                // player 1's turn
                if (name === "Player 1") {
                    console.log(`${name}'s move: `);
                    const playerRow = Number(prompt("Row: "));
                    console.log(`Row: ${playerRow}`);
                    const playerColumn = Number(prompt("Column: "));
                    console.log(`Column: ${playerColumn}`);

                    return move(playerRow, playerColumn, sign, name);
                }
                // player 2's turn
                else {
                    console.log(`${name}'s move: `);
                    const playerRow = prompt("Row: ");
                    console.log(`Row: ${playerRow}`);
                    const playerColumn = prompt("Column: ");
                    console.log(`Column: ${playerColumn}`);

                    return move(playerRow, playerColumn, sign, name);
                }
            }
        }
    }
    else {
        console.log("Invalid input");
    }
}


function move(row, column, playerSign, name) {
    if (board[row][column] === "") {
        board[row][column] = playerSign;
        console.log(`Row ${row}, Column ${column} chosen by ${playerSign}`);

        let hasWinner = checkForWin(playerSign);
        let hasTie = checkForTie();

        if (hasWinner === true) {
            console.log(`Winner: ${name} (${playerSign})`);
            isGameOver = true;
            clearBoard();
            const restart = prompt("Would you like to play again?").toUpperCase();

            if (restart === "YES") {
                console.log("Starting new game...");
                startNewGame();
            }
            else {
                console.log("Goodbye!");
            }
        }
        else if (hasTie === true) {
            console.log("Tie!");
            isGameOver = true;
            clearBoard();
            const restart = prompt("Would you like to play again?").toUpperCase();

            if (restart === "YES") {
                console.log("Starting new game...");
                startNewGame();
            }
            else {
                console.log("Goodbye!");
            }
        }
        // if game still ongoing (no tie or win)
        else {
            switchTurn(name);
        }
    } 
    else {
        console.log("This square has already been chosen!");
        return;
    }
}


function switchTurn(name) {
    if (name === "Player 1") {
        player2();
    }
    else {
        player1();
    }
}


function checkForWin(playerSign) {
    // rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === playerSign && board[i][1] === playerSign && board[i][2] === playerSign) {
            return true;  
        }
    }
    // columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === playerSign && board[1][i] === playerSign && board[2][i] === playerSign) {
            return true;  
        }
    }
    // diagonal 1
    if (board[0][0] === playerSign && board[1][1] === playerSign && board[2][2] === playerSign) {
        return true; 
    }
    // diagonal 2
    if (board[0][2] === playerSign && board[1][1] === playerSign && board[2][0] === playerSign) {
        return true; 
    }
}

function checkForTie() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                return false; 
            }
        }
    }
    return true;
}


function startNewGame() {
    clearBoard();
    player1;
    player2;
    isGameOver = false;
    startGame();
}




