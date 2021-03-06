const Table = require("cli-table");

const random = function(length = 1) {
  return Math.random() * length;
};

const createArray = function(size, filler = " ") {
  return new Array(size).fill(filler);
};

const generateSquareBoard = function(length, filler = " ") {
  const array = createArray(length, length);
  return array.map(x => createArray(x, filler));
};

const generateRandomNumber = function(random, min, max) {
  return Math.floor(random(max - min)) + min;
};

const checkBlock = function(board, row, col, checker) {
  const array = [];
  const rowIndex = Math.floor(row / 3);
  const colIndex = Math.floor(col / 3);
  for (let row = rowIndex * 3; row < rowIndex * 3 + 3; row++) {
    for (let col = colIndex * 3; col < colIndex * 3 + 3; col++) {
      array.push(board[row][col]);
    }
  }
  return !array.includes(checker);
};

const isIncludes = function(set, elem) {
  return set.includes(elem);
};

const isSameSets = function(set1, set2) {
  const isIncludesInSet1 = set1.every(isIncludes.bind(null, set2));
  const isIncludesInSet2 = set2.every(isIncludes.bind(null, set1));
  return isIncludesInSet1 && isIncludesInSet2;
};

const subset = function(superset, set) {
  return superset.some(isSameSets.bind(null, set));
};

const checkColumn = function(board, column, checker) {
  return board.every(function(element) {
    return !(element[column] == checker);
  });
};

const checkRow = function(board, row, checker) {
  return !board[row].includes(checker);
};

const checkValid = function(board, row, column, checker) {
  const isNotInRow = checkRow(board, row, checker);
  const isNotInCol = checkColumn(board, column, checker);
  const isNotInBlock = checkBlock(board, row, column, checker);
  return isNotInCol && isNotInRow && isNotInBlock;
};

const placeCells = function(random, board, places) {
  const boardCopy = board.slice();
  places.forEach(place => {
    let row = place[0];
    let column = place[1];
    let placeHolder;
    do {
      placeHolder = Math.ceil(random(9));
    } while (!checkValid(boardCopy, row, column, placeHolder));
    boardCopy[row][column] = placeHolder;
  });
  return boardCopy;
};

const generateRandomPlaces = function(random, rows, cols, noOfPlaces) {
  let result = [];
  while (result.length <= noOfPlaces) {
    let row = Math.floor(random(rows));
    let col = Math.floor(random(cols));
    const coordinate = [row, col];
    if (!subset(result, coordinate)) {
      result.push(coordinate);
    }
  }
  return result;
};

const generateTable = function(board) {
  const table = new Table();
  board.forEach(x => table.push(x));
  return table;
};

const main = function() {
  const board = generateSquareBoard(9, "");
  const noOfPlaces = generateRandomNumber(random, 18, 25);
  const places = generateRandomPlaces(random, 9, 9, noOfPlaces);
  const finalBoard = placeCells(random, board, places);
  const printBoard = generateTable(finalBoard).toString();
  return printBoard;
};

console.log(main());
