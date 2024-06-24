let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let currentPlayer = 'X';
let gameActive = true;

function makeMove(row, col) {
  if (gameActive && board[row][col] === '') {
    board[row][col] = currentPlayer;
    const cell = document.getElementsByClassName('cell')[row * 3 + col];
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    if (checkWin()) {
      document.getElementById('board').classList.add('game-over');
      document.getElementsByClassName('result')[0].innerText = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (checkDraw()) {
      document.getElementById('board').classList.add('game-over');
      document.getElementsByClassName('result')[0].innerText = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return true;
    }
    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return true;
    }
  }
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true;
  }
  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true;
  }
  return false;
}

function checkDraw() {
  for (let row of board) {
    if (row.includes('')) {
      return false;
    }
  }
  return true;
}

function resetBoard() {
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('board').classList.remove('game-over');
    document.getElementsByClassName('result')[0].innerText = '';
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
      cells[i].classList.remove('X');
      cells[i].classList.remove('O');
      cells[i].removeAttribute('onclick'); // Remove the 'onclick' attribute
      cells[i].addEventListener('click', makeMove.bind(null, Math.floor(i / 3), i % 3)); // Add the click event listener
    }
  }
  