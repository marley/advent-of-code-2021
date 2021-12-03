// PARSE TEST DATA INTO A JSON
const dataToArray = (rawData) => {
  return rawData.split("\n").map((numberStr) => parseInt(numberStr));
};

const dataToObjectArray = (rawData) => {
  return rawData.split("\n").map((command) => {
    const commandArr = command.split(" ");
    return { direction: commandArr[0], units: parseInt(commandArr[1]) };
  });
};

module.exports = { dataToArray, dataToObjectArray };
