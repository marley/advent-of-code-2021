// 1
const dataToArray = (rawData) => {
  return rawData.split("\n").map((numberStr) => parseInt(numberStr));
};

// 2
const dataToObjectArray = (rawData) => {
  return rawData.split("\n").map((command) => {
    const commandArr = command.split(" ");
    return { direction: commandArr[0], units: parseInt(commandArr[1]) };
  });
};

// 3a
const binaryDataToSumsArray = (rawData) => {
  const binaryArr = rawData.split("\n");
  const columnSums = binaryArr.reduce((columnSums, binaryNum) => {
    // Keep track of the sum of each column
    for (let i = 0; i < binaryNum.length; i++) {
      if (columnSums[i]) {
        columnSums[i] += parseInt(binaryNum[i]);
      } else {
        columnSums[i] = parseInt(binaryNum[i]);
      }
    }
    return columnSums;
  }, []);
  // Use this to compare the sum of each column to length of entire array.  If sum is > 1/2 of array length, there are more 1s.  If not, more 0's.
  return { arrayLength: binaryArr.length, columnSums: columnSums };
};

// 3b
const binaryDataToArray = (rawData) => {
  return rawData.split("\n");
};

// 4a
const bingoDataToObject = (rawData) => {
  const allData = rawData.split("\n");
  const randomDraws = allData[0].split(",");
  const boards = {}; // {0 : [[1,2,3], [4,5,6]], 1 : [[7,8,9],...], ...}
  let boardCount = -1;
  for (const row of allData.splice(1)) {
    if (row === "") {
      // next row will start next board
      boardCount += 1;
      boards[boardCount] = [];
    } else {
      boards[boardCount].push(row.trim().split(/\s+/));
    }
  }

  return { randomDraws, boards };
};

module.exports = {
  dataToArray,
  dataToObjectArray,
  binaryDataToSumsArray,
  binaryDataToArray,
  bingoDataToObject,
};
