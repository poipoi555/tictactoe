
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
    const squares = document.querySelectorAll(".row1 > div, .row2 > div, .row3 > div");
    squares.forEach(square => square.textContent = "");
}

let isGameOver = false;
let player1;
let player2;
let isPlayer1Turn = true;

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

    setUpBoard();
    checkPlayerTurn();
}

function setUpBoard() {
    const squares = document.querySelectorAll(".row1 > div, .row2 > div, .row3 > div");
    squares.forEach(square => {
        // remove old listeners 
        square.replaceWith(square.cloneNode(true));
    });

    // add new listeners
    document.querySelectorAll(".row1 > div, .row2 > div, .row3 > div")
            .forEach(square => square.addEventListener("click", handleMove));
}


function handleMove(event) {
    if (!isGameOver) {
        let currentPlayer = null;
        if (isPlayer1Turn) {
            currentPlayer = player1;
        }
        else {
            currentPlayer = player2;
        }
        const row = parseInt(event.target.classList[0].charAt(1));
        const column = parseInt(event.target.classList[0].charAt(3));
        const name = currentPlayer.name;
        const sign = currentPlayer.sign;

        console.log(`${name}'s move: `);
        console.log(`Row: ${row}`);
        console.log(`Column: ${column}`);

        move(row, column, sign, name);
    }
    else {
        return;
    }
}


// happens once for first turn, switchTurn() used for subsequent turns
function checkPlayerTurn() {
    const firstSecond = prompt("Who goes first?").toUpperCase();

    if (firstSecond === "PLAYER 1") {
        console.log("Player 1 goes first");
        let currPlayer = document.querySelector(".currplayer");
        currPlayer.textContent = "Player 1's turn";
        isPlayer1Turn = true;
    } 
    else {
        console.log("Player 2 goes first");
        let currPlayer = document.querySelector(".currplayer");
        currPlayer.textContent = "Player 2's turn";
        isPlayer1Turn = false;
    }
}


function createPlayer(name, sign) {
    if (sign === "X" || sign === "O") {
        return {
            name: name,
            sign: sign
        };
    }
    else {
        console.log("Invalid input");
        return;
    }
}


function move(row, column, playerSign, name) {
    if (board[row][column] === "") {
        board[row][column] = playerSign;
        const square = document.querySelector(`.r${row}b${column}`);
        square.textContent = playerSign;

        console.log(`Row ${row}, Column ${column} chosen by ${playerSign}`);

        let hasWinner = checkForWin(playerSign);
        let hasTie = checkForTie();

        if (hasWinner === true) {
            if (name === "Player 1") {
                const popup = document.querySelector(".player1win");
                popup.style.display = "block";

                const restart = document.querySelector(".restart1");
                restart.addEventListener("click", () => {
                    console.log("Starting new game...");
                    popup.style.display = "none";
                    startNewGame();
                });

                const end = document.querySelector(".close1");
                end.addEventListener("click", () => {
                    popup.style.display = "none";
                    console.log("Goodbye!");
                });
            }
            else {
                const popup = document.querySelector(".player2win");
                popup.style.display = "block";

                const restart = document.querySelector(".restart2");
                restart.addEventListener("click", () => {
                    console.log("Starting new game...");
                    popup.style.display = "none";
                    startNewGame();
                });

                const end = document.querySelector(".close2");
                end.addEventListener("click", () => {
                    popup.style.display = "none";
                    console.log("Goodbye!");
                });
            }
            console.log(`Winner: ${name} (${playerSign})`);
            isGameOver = true;
        }
        else if (hasTie === true) {
            const popup = document.querySelector(".tie");
            popup.style.display = "block";

            const restart = document.querySelector(".restartT");
            restart.addEventListener("click", () => {
                console.log("Starting new game...");
                popup.style.display = "none";
                startNewGame();
            });

            const end = document.querySelector(".closeT");
            end.addEventListener("click", () => {
                popup.style.display = "none";
                console.log("Goodbye!");
            });

            console.log("Tie!");
            isGameOver = true;
        }
        // if game still ongoing (no tie or win)
        else {
            let currPlayer = document.querySelector(".currplayer");
            if (name === "Player 1") {
                currPlayer.textContent ="Player 2's turn";
            }
            else {
                currPlayer.textContent ="Player 1's turn";
            } 
            switchTurn();
        }
    } 
    else {
        console.log("This square has already been chosen!");
        return;
    }
}


function switchTurn() {
    isPlayer1Turn = !isPlayer1Turn;
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





