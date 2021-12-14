const { rawData } = require("./data_raw_5.js");
const { binaryDataToArray } = require("../utils.js");

const coordinateStrToNumbers = (coordinateStr) => {
  return coordinateStr.split(",").map((numStr) => parseInt(numStr));
};

const recordAllPointsInLine = (coordinate, allPoints, dangerCount) => {
  if (allPoints[coordinate]) {
    if (allPoints[coordinate] === 1) {
      // if a coordinate has an existing crossing, add to dangerous points count
      dangerCount += 1; // only increment the first time. All we care about is if there are at least 2
    }
    allPoints[coordinate] += 1; // still gonna increment in case we need this later
  } else {
    allPoints[coordinate] = 1;
  }
  return { newAllPoints: allPoints, newDangerCount: dangerCount };
};

const countLineCrossings = (data) => {
  // initialize dangerous points count
  let dangerCount = 0;
  let allPoints = {};
  // iterate through each line and
  // if x1 = x2 or y1 = y2, collect x values and y values of each coordinate. e.g.: 0,9 -> 5,9 becomes ["0,0": 1, "1:9": 1, "2:9" : 1, ... "5:9": 1], counting the occurence of each coordinate in the line

  for (const line of data) {
    const [pointA, pointB] = line.split(" -> ");
    let [x1, y1] = coordinateStrToNumbers(pointA);
    let [x2, y2] = coordinateStrToNumbers(pointB);
    if (x1 === x2) {
      let smallestY = y1 > y2 ? y2 : y1;
      let lineLength = Math.abs(y1 - y2); // get absolute difference
      // then we want [x1,smallestY, x1:smallestY + 1, .... x1:smallestY + lineLength ]
      for (let i = 0; i <= lineLength; i++) {
        let coordinate = `${x1},${smallestY + lineLength - i}`;
        let { newAllPoints, newDangerCount } = recordAllPointsInLine(
          coordinate,
          allPoints,
          dangerCount
        );
        dangerCount = newDangerCount;
        allPoints = newAllPoints;
      }
    }
    if (y1 === y2) {
      let smallestX = x1 > x2 ? x2 : x1;
      let lineLength = Math.abs(x1 - x2); // get absolute difference
      // then we want [smallestX,y1, smallestX + 1,y1 .... smallestX + lineLength,y1 ]
      for (let i = 0; i <= lineLength; i++) {
        let coordinate = `${smallestX + lineLength - i},${y1}`;
        let { newAllPoints, newDangerCount } = recordAllPointsInLine(
          coordinate,
          allPoints,
          dangerCount
        );
        dangerCount = newDangerCount;
        allPoints = newAllPoints;
      }
    }
  }
  return dangerCount;
};

const rawTestData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

// const testData = binaryDataToArray(rawTestData);
// console.log(countLineCrossings(testData));

const data = binaryDataToArray(rawData);
console.log(countLineCrossings(data));
