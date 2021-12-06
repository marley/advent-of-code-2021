const { rawData } = require("./data_raw_4.js");
const { bingoDataToObject } = require("../utils.js");

const updateBoardAndCheckForBingo = (
  randomDraw,
  board,
  boardNumber,
  bingoTracker
) => {
  let markedBoard = board.map((arr) => arr.slice());
  let bingo = -1;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === randomDraw) {
        markedBoard[i][j] = "x";
        if (bingoTracker[`board${boardNumber}-row${i}`]) {
          // update sum for that row
          bingoTracker[`board${boardNumber}-row${i}`] += 1;
          if (bingoTracker[`board${boardNumber}-row${i}`] === board.length) {
            bingo = parseInt(randomDraw);
          }
        } else {
          bingoTracker[`board${boardNumber}-row${i}`] = 1;
        }

        if (bingoTracker[`board${boardNumber}-col${j}`]) {
          // update sum for that column
          bingoTracker[`board${boardNumber}-col${j}`] += 1;
          if (bingoTracker[`board${boardNumber}-col${j}`] === board.length) {
            bingo = parseInt(randomDraw);
          }
        } else {
          bingoTracker[`board${boardNumber}-col${j}`] = 1;
        }
        break; //  you won't find that same number again in the rest of the board, so break
      }
    }
  }
  return { markedBoard, bingo };
};

const calculateScore = (board, mostRecentDraw) => {
  const sumOfUnmarkedNumbers = board.reduce((unmarkedSum, currentRow) => {
    for (const num of currentRow) {
      if (num !== "x") {
        unmarkedSum += parseInt(num);
      }
    }
    return unmarkedSum;
  }, 0);
  return sumOfUnmarkedNumbers * mostRecentDraw;
};

const predictBingo = (data) => {
  const { randomDraws, boards } = data;
  const bingoTracker = {}; // keeps track of how many x's are on each row and column.  If sum = 5, then that's a bingo.
  for (const randomDraw of randomDraws) {
    for (const boardNumber in boards) {
      const { markedBoard, bingo } = updateBoardAndCheckForBingo(
        randomDraw,
        boards[boardNumber],
        boardNumber,
        bingoTracker
      );
      if (bingo >= 0) {
        return calculateScore(markedBoard, bingo);
      }
      boards[boardNumber] = markedBoard;
    }
  }
};

const rawTestData = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

// const testData = bingoDataToObject(rawTestData);
// console.log(predictBingo(testData));

const data = bingoDataToObject(rawData);
console.log(predictBingo(data));
