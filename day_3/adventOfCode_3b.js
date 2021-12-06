const { rawData } = require("./data_raw_3.js");
const { binaryDataToArray } = require("../utils.js");

// const calculatePowerConsumption = (data) => {
//   let gamma = "",
//     epsilon = "";
//   for (let i = 0; i < data.columnSums.length; i++) {
//     // find most common value per column and use it to determine gamma rate
//     const digit = data.columnSums[i] > data.arrayLength / 2 ? 1 : 0;
//     gamma += "" + digit;
//     // and set epsilon to be the opposite of that
//     epsilon += "" + epsilonDigit(digit);
//   }
//   // gamma and epsilon are binary strings, so convert to decimal and then multiply
//   return parseInt(gamma, 2) * parseInt(epsilon, 2);
// };

const prevelanceOfNumberAtIndex = (index, prevelance, data) => {
  // prev = "leastCommon" or "mostCommon"
  console.log("There are still candidates:", data.length);
  const oneMoreCommon = [];
  const zeroMoreCommon = [];
  for (let i = 0; i < data.length; i++) {
    console.log(data[i], index);
    if (parseInt(data[i][index]) === 1) {
      oneMoreCommon.push(data[i]);
    } else {
      zeroMoreCommon.push(data[i]);
    }
  }
  console.log(oneMoreCommon, zeroMoreCommon);
  if (oneMoreCommon.length >= zeroMoreCommon.length) {
    if (prevelance === "mostCommon") {
      return oneMoreCommon;
    }
    return zeroMoreCommon;
  } else {
    if (prevelance === "mostCommon") {
      return zeroMoreCommon;
    }
    return oneMoreCommon;
  }
};

const calculateRatingRecursive = (
  data,
  desiredValue,
  candidates,
  bitPosition
) => {
  if (candidates.length === 1) {
    return candidates[0];
  } else if (candidates.length === 0) {
    console.log("Fill up candidates");
    candidates = [...data];
  }
  if (desiredValue === "oxygenGenerator") {
    candidates = prevelanceOfNumberAtIndex(
      bitPosition,
      "mostCommon",
      candidates
    );
  } else {
    candidates = prevelanceOfNumberAtIndex(
      bitPosition,
      "leastCommon",
      candidates
    );
  }
  return calculateRatingRecursive(
    data,
    desiredValue,
    candidates,
    bitPosition + 1
  );
};

const calculateRating = (data, desiredValue) => {
  // desiredValue = 'oxygenGenerator' or 'co2Scrubber'
  const oxygenGeneratorRating = calculateRatingRecursive(
    [...data],
    "oxygenGenerator",
    [],
    0
  );
  console.log(oxygenGeneratorRating);
  console.log(" >>>>>>> Now for co2");
  const co2Scrubber = calculateRatingRecursive([...data], "co2Scrubber", [], 0);
  console.log(co2Scrubber);
  return parseInt(oxygenGeneratorRating, 2) * parseInt(co2Scrubber, 2);
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

// const testData = binaryDataToArray(testRawData);
// console.log(testData);
// console.log(calculateRating(testData));

const data = binaryDataToArray(rawData);
console.log(calculateRating(data));
