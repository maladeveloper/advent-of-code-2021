export {};
const openFile = require("../helper").openFile;

const openInitialPositions = async () => {
  const initialPositions = await openFile(
    "src/day-7-the-treachery-of-whales/initial_positions.txt"
  );
  return initialPositions
    .split(/,|\n/)
    .filter((position) => position.length > 0)
    .map((positionStr) => parseInt(positionStr));
};

module.exports = { openInitialPositions };
