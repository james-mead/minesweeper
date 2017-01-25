var numCells = 9
var numberOfMines = Math.ceil(Math.random() * numCells /2);


while (numberOfMines > 0) {
  var randomCell = Math.floor(Math.random() * numCells);
  if (board.cells.randomCell.isMine !== true) {
    console.log("is not mine")
    board.cells.randomCell.isMine === true;
    numberOfMines--
  }
  else {
    console.log("already a mine")
  }
}
// console.log('Number of mines: ' + numberOfMines)
// console.log('Random Cell: ' + randomCell)
