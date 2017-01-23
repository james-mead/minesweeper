document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('click', checkForWin)
document.addEventListener('contextmenu', checkForWin)

// Define your `board` object here!
var board = {
  cells: [
    {row: 0, col: 0, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
    {row: 0, col: 1, isMine: true, isMarked: false, surroundingMines: 0, hidden: true},
    {row: 0, col: 2, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
    {row: 1, col: 0, isMine: true, isMarked: false, surroundingMines: 0, hidden: true},
    {row: 1, col: 1, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
    {row: 1, col: 2, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
    {row: 2, col: 0, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
    {row: 2, col: 1, isMine: false, isMarked: false, surroundingMines: 0, hidden: true},
    {row: 2, col: 2, isMine: false, isMarked: false, surroundingMines: 0, hidden: true}
  ]
}


//Create

function startGame () {
  //loop through each cell
  for (var i = 0; i < board.cells.length; i++) {
    // call countSurroundingMines on cell and return the count to surroundingMines property value
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
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
  console.log('User has Won')
  lib.displayMessage('You win!')
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
