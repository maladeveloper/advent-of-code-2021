export {};
const { openInitialPositions } = require("../helper");

const findMedianNumbers = (numArray: Array<number>): Array<number> => {
  const sortedNumArray = [...numArray].sort((a, b) => a - b);
  const lengthNums = sortedNumArray.length;
  const midPosition = Math.floor(lengthNums / 2);
  const median = sortedNumArray[midPosition];

  if (lengthNums % 2 == 0) {
    const median2 = sortedNumArray[midPosition - 1];
    if (median !== median2) {
      return [median, median2];
    }
  }

  return [median];
};

const calculateFuelForPosition = (
  positions: Array<number>,
  chosenPosition: number
): number => {
  let fuelUsed = 0;
  for (const position of positions) {
    fuelUsed += Math.abs(chosenPosition - position);
  }
  return fuelUsed;
};

const main = (initialPositions: Array<number>): number => {
  const mediansArray = findMedianNumbers(initialPositions);
  let lowestFuelUsed: number;
  for (const median of mediansArray) {
    const fuelUsed = calculateFuelForPosition(initialPositions, median);
    if (lowestFuelUsed) {
      if (fuelUsed < lowestFuelUsed) {
        lowestFuelUsed = fuelUsed;
      }
    } else {
      lowestFuelUsed = fuelUsed;
    }
  }

  return lowestFuelUsed;
};

const present = async () => {
  const initialPositions = await openInitialPositions();
  console.log(
    "The initial positions that the crabs are in as as follows-",
    initialPositions
  );
  const result = main(initialPositions);
  console.log("The lowest fuel required to align the crabs is:", result);
};

module.exports = {
  main,
  present,
};
