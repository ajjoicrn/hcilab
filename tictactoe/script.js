document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    function checkWinner() {
      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          gameActive = false;
          return gameBoard[a];
        }
      }
      if (!gameBoard.includes('')) {
        gameActive = false;
        return 'Draw';
      }
      return null;
    }
  
    function handleCellClick(event) {
      const cellIndex = event.target.id;
      if (gameBoard[cellIndex] || !gameActive) return;
      gameBoard[cellIndex] = currentPlayer;
      event.target.textContent = currentPlayer;
      const winner = checkWinner();
      if (winner) {
        status.textContent = winner === 'Draw' ? 'It\'s a draw!' : `Player ${winner} wins!`;
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  
    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach(cell => cell.textContent = '');
    }
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
  });
  