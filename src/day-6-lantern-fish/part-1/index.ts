export {};
const { openInitialAges } = require("../helper");

const fishAgesAfterNextDay = (fishAges: Array<number>): Array<number> => {
  let newFishesToAddNum = 0;
  const nextFishAges = fishAges.map((currentAge) => {
    if (currentAge == 0) {
      newFishesToAddNum += 1;
      return 6;
    }
    return currentAge - 1;
  });
  const newFishedToAdd = Array.from({ length: newFishesToAddNum }, () => 8);

  return [...nextFishAges, ...newFishedToAdd];
};

const main = (initialFishAges: Array<number>): number => {
  const DAYS = 80;
  let fishAges = initialFishAges;

  for (let i = 0; i < DAYS; i++) {
    fishAges = fishAgesAfterNextDay(fishAges);
  }

  return fishAges.length;
};

const present = async () => {
  const initialFishAges = await openInitialAges();
  console.log("The inital ages of the fish are as follows:", initialFishAges);
  const result = main(initialFishAges);
  console.log("After 80 days the number of fish that will exist is:", result);
};

module.exports = {
  main,
  present,
  fishAgesAfterNextDay,
};
