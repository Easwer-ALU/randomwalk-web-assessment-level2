// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all the cell elements and score elements
    const cells = document.querySelectorAll('.cell');
    const player1ScoreEl = document.getElementById('player1Score');
    const player2ScoreEl = document.getElementById('player2Score');
    const turnInfoEl = document.getElementById('turnInfo');
    const resetButton = document.getElementById('resetButton');
    
    // Initialize scores and player turns
    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = 'X'; // Player 1 starts with 'X'
    let gameActive = true; // Game state flag
    let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 board

    // Define winning conditions (rows, columns, diagonals)
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    // Function to handle cell clicks
    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        // Extract the cell index from the id
        const clickedCellIndex = parseInt(clickedCell.getAttribute('id').replace('cell', '')) - 1;

        // Check if the cell is already filled or the game is inactive
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // Update the cell and check the game result
        updateCell(clickedCell, clickedCellIndex);
        checkResult();
    };

    // Function to update the cell's display and state
    const updateCell = (cell, index) => {
        gameState[index] = currentPlayer; // Update the game state
        cell.innerHTML = currentPlayer; // Display the player's mark
    };

    // Function to check game result for win or draw
    const checkResult = () => {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];

            // Skip if the cells are not filled
            if (a === '' || b === '' || c === '') {
                continue;
            }

            // Check if the current condition is met
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        // Announce winner or draw
        if (roundWon) {
            announceWinner(currentPlayer);
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            announceDraw();
            gameActive = false;
            return;
        }

        // Change the player if no win or draw
        changePlayer();
    };

    // Function to announce the winner and update the score
    const announceWinner = (player) => {
        turnInfoEl.textContent = `Player ${player === 'X' ? '1' : '2'} Wins!`;
        if (player === 'X') {
            player1Score++;
            player1ScoreEl.textContent = `Player 1: ${player1Score}`;
        } else {
            player2Score++;
            player2ScoreEl.textContent = `Player 2: ${player2Score}`;
        }
    };

    // Function to announce a draw
    const announceDraw = () => {
        turnInfoEl.textContent = "Draw!";
    };

    // Function to switch the current player
    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnInfoEl.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s Turn`;
    };

    // Function to reset the game to its initial state
    const resetGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        turnInfoEl.textContent = `Player 1's Turn (X)`;
        cells.forEach(cell => cell.innerHTML = '');
    };

    // Add event listeners for each cell and the reset button
    cells.forEach(cell => cell.addEventListener('click', handle

