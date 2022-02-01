export {};
const openFile = require("../helper").openFile;

const openInitialAges = async () => {
  const initialAges = await openFile("src/day-6-lantern-fish/initial_ages.txt");
  return initialAges
    .split(/,|\n/)
    .filter((ageStr) => ageStr.length > 0)
    .map((ageStr) => parseInt(ageStr));
};

module.exports = { openInitialAges };
