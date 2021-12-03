const { rawData } = require("./data_raw_1.js");

const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

// PARSE TEST DATA INTO A JSON

function dataToArray() {
  return rawData.split("\n").map((numberStr) => parseInt(numberStr));
}

// THE ANSWER

const countIncreases = (data) => {
  return data.reduce((count, _, i) => {
    if (i > 0 && data[i - 1] < data[i]) {
      count += 1;
    }
    return count;
  }, 0);
};

console.log(countIncreases(testData));
console.log(countIncreases(dataToArray(rawData)));
