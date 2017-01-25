// This game can get a little loud, prompt user to turn down volume
checkVolume();
var volumeChecked = confirm("This game can get a little loud so please ensure you turn your volume down :)")

function checkVolume() {
  if (volumeChecked === false) {
    volumeChecked = confirm("This game can get a little loud so please ensure you turn your volume down :)")
  }
  else {
    return
  }
}

document.addEventListener('DOMContentLoaded', startGame)

// document.getElementById('newGame').addEventListener('click', resetBoard)

// Define your `board` object here!
var board = {
  // cells: [
  //   {row: 0, col: 0, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
  //   {row: 0, col: 1, isMine: true, isMarked: false, surroundingMines: 0, hidden: true},
  //   {row: 0, col: 2, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
  //   {row: 1, col: 0, isMine: true, isMarked: false, surroundingMines: 0, hidden: true},
  //   {row: 1, col: 1, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
  //   {row: 1, col: 2, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
  //   {row: 2, col: 0, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
  //   {row: 2, col: 1, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
  //   {row: 2, col: 2, isMine: false, isMarked: false, surroundingMines: 0, hidden: true}
  // ]
}

// Defining Complexity
var levelEasy = 9;
// var levelMedium = 16;
// var levelHard = 25;
// Default Complexity
var numCells = levelEasy;

//Create a new board
createBoard(numCells)

function createBoard (numCells) {
  console.log('Creating Board')
  // var board = {}; // tried setting board object inside function... no go.
  board.cells = [];
  // loop through rows
  for (i = 0; i < Math.sqrt(numCells); i++) {
    // loop through columns
    for (j = 0; j < Math.sqrt(numCells); j++) {
      // set the property values of each cell
      console.log('looping through row: ' + i + ' and column: ' + j + ' to set value')
      var cellValue = {row: i, col: j, isMine: false, isMarked: false, hidden: true};
      // push the value to the 'board.cells' array
      board.cells.push(cellValue)
    }
  }
  // generating mines
  generateMines();
}

// Create mines
function generateMines() {
  // generate a random number between 0 and 1, times it by the number of cells, then divide by 3
    var counter = Math.ceil(Math.random() * numCells / 3);
    // while number of mines is greater than 0
    while (counter > 0) {
      // select a random cell from board
        var randomCell = Math.floor(Math.random() * numCells);
        // if the cell does not have an existing mine, set 'isMine' value and count down
        if (board.cells[randomCell].isMine !== true) {
            console.log("is not an existing mine")
            board.cells[randomCell].isMine = true;
            counter--
        } else {
          // already an existing mine. Do not count down
            console.log("already a mine")
        }
    }
}

// Start new game

function startGame () {
  // inform user to turn volume down
  //loop through each cell
  for (var i = 0; i < board.cells.length; i++) {
    // call countSurroundingMines on cell which returns the count of surrounding Mines to the surroundingMines property value
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
    document.addEventListener('click', checkForWin)
    document.addEventListener('contextmenu', checkForWin)
    document.addEventListener('click', detectStatus)
    document.addEventListener('contextmenu', detectStatus)
    document.addEventListener('click', resetGame)
  }
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin () {
  // looping through each cell
  for (var i = 0; i < board.cells.length; i++) {
    // if cell is a mine and isn't marked, user has not won yet, exit function
      if (board.cells[i].isMine && !board.cells[i].isMarked) {
          return
      }
      // if cell is not a mine and is still hidden, user has not won yet, exit function
      if (board.cells[i].hidden && !board.cells[i].isMine) {
          return
      }
  }
  //else log you win
  lib.displayMessage('You win!');
}

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0;
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine === true) {
      count++;
    }
  }
  return count;
}

// Determine win or lose
function detectStatus () {
var gameStatus = document.getElementById('message').innerHTML;
if (event.target.parentNode.className === 'board') {
    if (gameStatus === "<p>You win!</p>") {
        console.log("Detected Win");
        var winFX = new Audio('sounds/win.mp3');
        winFX.volume = 0.1;
        winFX.play();
        addResetButton();
        setTimeout(resetGame, 3000);
    } else if (gameStatus === "<p>BOOM!</p>") {
        console.log("Detected Loss");
        var lossFX = new Audio('sounds/loss.mp3');
        lossFX.volume = 0.1;
        lossFX.play();
        addResetButton();
        setTimeout(resetGame, 3000);
    } else if (event.target.classList.contains('marked')) {
        var revealFX = new Audio('sounds/reveal.mp3');
        revealFX.volume = 0.1;
        revealFX.play();
    } else {
        var clickFX = new Audio('sounds/snap.mp3');
        clickFX.volume = 0.1;
        clickFX.play();
    }
  }
}

// Reset game

function addResetButton () {
  //Create reset button
  var btn = document.createElement("BUTTON");
  var btnText = document.createTextNode("Click to play again");
  btn.setAttribute('id', 'resetButton')
  document.body.appendChild(btn);
  btn.appendChild(btnText);
}

function resetGame () {
  if (event.target.id === 'resetButton') {
    console.log('Resetting Game');
    //remove button
    event.target.remove();
    //remove and reset board
    var board = document.getElementsByClassName('board')[0];
    board.innerHTML = '';
    createBoard(numCells);
    startGame();
  }
}
