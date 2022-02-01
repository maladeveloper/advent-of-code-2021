export {};
const { openInitialPositions } = require("../helper");

const calculateFuelForPosition = (
  positions: Array<number>,
  chosenPosition: number
): number => {
  let fuelUsed = 0;
  for (const position of positions) {
    const distance = Math.abs(chosenPosition - position);
    for (let i = 0; i < distance; i++) {
      fuelUsed += i + 1;
    }
  }
  return fuelUsed;
};

const main = (initialPositions: Array<number>): number => {
  const maxPosition = Math.max(...initialPositions);
  const minPosition = Math.min(...initialPositions);
  let lowestFuelUsed: number;

  for (let position = minPosition; position < maxPosition + 1; position++) {
    const fuelUsed = calculateFuelForPosition(initialPositions, position);
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
    "The initial positions that the crabs are in are as follows-",
    initialPositions
  );
  const result = main(initialPositions);
  console.log(
    "The lowest fuel required to align the crabs when fuel increases by distances traveled is:",
    result
  );
};

module.exports = {
  main,
  present,
};
