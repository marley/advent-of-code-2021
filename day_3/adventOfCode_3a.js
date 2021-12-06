const { rawData } = require("./data_raw_3.js");
const { binaryDataToSumsArray } = require("../utils.js");

const epsilonDigit = (gamma) => {
  return gamma === 1 ? 0 : 1;
};

const calculatePowerConsumption = (data) => {
  let gamma = "",
    epsilon = "";
  for (let i = 0; i < data.columnSums.length; i++) {
    // find most common value per column and use it to determine gamma rate
    const digit = data.columnSums[i] > data.arrayLength / 2 ? 1 : 0;
    gamma += "" + digit;
    // and set epsilon to be the opposite of that
    epsilon += "" + epsilonDigit(digit);
  }
  // gamma and epsilon are binary strings, so convert to decimal and then multiply
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const testRawData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

// const testData = binaryDataToSumsArray(testRawData);
// console.log(testData);
// console.log(calculatePowerConsumption(testData));

const data = binaryDataToSumsArray(rawData);
console.log(calculatePowerConsumption(data));
