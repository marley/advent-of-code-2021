const { rawData } = require("./data_raw_2.js");
const { dataToObjectArray } = require("../utils.js");

const testDataRaw = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const calculatePosition = (objectArr) => {
  let horizontalPos = 0,
    depth = 0;
  for (const obj of objectArr) {
    switch (obj.direction) {
      case "forward":
        horizontalPos += obj.units;
        break;
      case "down":
        depth += obj.units;
        break;
      case "up":
        depth -= obj.units;
        break;
      default:
        break;
    }
  }

  return horizontalPos * depth;
};

// const testData = dataToObjectArray(testDataRaw);
// console.log(calculatePosition(testData));

const data = dataToObjectArray(rawData);
console.log(calculatePosition(data));
