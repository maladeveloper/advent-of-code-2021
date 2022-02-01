export {};
const { openInitialAges } = require("../helper");

const ageToNumAfterDay = (ageToNum) => {
  const bornAge = 8;
  const regeneratedAge = 6;
  let newFishToAddNum = 0;
  const newAgeToNum = {};

  const sortedAges = Object.keys(ageToNum)
    .map((ageStr) => parseInt(ageStr))
    .sort((a, b) => b - a);

  sortedAges.forEach((age) => {
    const currentFishesPresent = ageToNum[age];
    if (age === 0) {
      newFishToAddNum = currentFishesPresent;
      newAgeToNum[regeneratedAge] += currentFishesPresent;
    } else {
      newAgeToNum[age - 1] = currentFishesPresent;
    }
  });

  newAgeToNum[bornAge] = newFishToAddNum;
  return newAgeToNum;
};

const convertToAgeToNum = (initialFishAges: Array<number>) => {
  const maxAge = 8;
  const ageToNum = {};
  for (let i = 0; i < maxAge + 1; i++) {
    ageToNum[i] = 0;
  }

  initialFishAges.forEach((age) => {
    ageToNum[age] += 1;
  });
  return ageToNum;
};

const main = (initialFishAges: Array<number>): number => {
  const DAYS = 256;
  let ageToNum = convertToAgeToNum(initialFishAges);

  for (let i = 0; i < DAYS; i++) {
    ageToNum = ageToNumAfterDay(ageToNum);
  }
  const nums = Object.values(ageToNum).map((numStr: string) =>
    parseInt(numStr)
  );
  let numFishes = 0;
  for (const num of nums) {
    numFishes += num;
  }
  return numFishes;
};

const present = async () => {
  const initialFishAges = await openInitialAges();
  console.log("The inital ages of the fish are as follows:", initialFishAges);
  const result = main(initialFishAges);
  console.log("After 256 days the number of fish that will exist is:", result);
};

module.exports = {
  main,
  present,
};
