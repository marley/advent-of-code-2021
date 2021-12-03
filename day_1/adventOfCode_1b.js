const { rawData } = require("./data_raw_1.js");

const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

// PARSE TEST DATA INTO A JSON
function dataToArray() {
  return rawData.split("\n").map((numberStr) => parseInt(numberStr));
}

// THE ANSWER
const arrayOfWindowSums = (data) => {
  const arr = [];
  let i = 0;
  while (i < data.length - 2) {
    const windowSum = data[i] + data[i + 1] + data[i + 2];
    arr.push(windowSum);
    i += 1;
  }
  return arr;
};

const countIncreases = (data) => {
  const windowSumArray = arrayOfWindowSums(data);
  return windowSumArray.reduce((count, _, i) => {
    if (i > 0 && windowSumArray[i - 1] < windowSumArray[i]) {
      count += 1;
    }
    return count;
  }, 0);
};

console.log(countIncreases(testData));
console.log(countIncreases(dataToArray(rawData)));
