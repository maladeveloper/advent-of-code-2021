export {};
const { main, fishAgesAfterNextDay } = require("../index");
const initialFishAges = [3, 4, 3, 1, 2];
const dayToNextDayAges = [
  initialFishAges,
  [2, 3, 2, 0, 1],
  [1, 2, 1, 6, 0, 8],
  [0, 1, 0, 5, 6, 7, 8],
  [6, 0, 6, 4, 5, 6, 7, 8, 8],
  [5, 6, 5, 3, 4, 5, 6, 7, 7, 8],
  [4, 5, 4, 2, 3, 4, 5, 6, 6, 7],
  [3, 4, 3, 1, 2, 3, 4, 5, 5, 6],
  [2, 3, 2, 0, 1, 2, 3, 4, 4, 5],
  [1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 8],
  [0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 7, 8],
  [6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 7, 8, 8, 8],
  [5, 6, 5, 3, 4, 5, 6, 0, 0, 1, 5, 6, 7, 7, 7, 8, 8],
  [4, 5, 4, 2, 3, 4, 5, 6, 6, 0, 4, 5, 6, 6, 6, 7, 7, 8, 8],
  [3, 4, 3, 1, 2, 3, 4, 5, 5, 6, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8],
  [2, 3, 2, 0, 1, 2, 3, 4, 4, 5, 2, 3, 4, 4, 4, 5, 5, 6, 6, 7],
  [1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 8],
  [0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 7, 8],
  [
    6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
    8,
  ],
];

describe("main", () => {
  it("returns the number of fish after 80 days", () => {
    expect(main(initialFishAges)).toEqual(5934);
  });
});

describe("fishAgesAfterNextDay", () => {
  it("returns the number of fish and its age after one day has passed", () => {
    for (let i = 0; i < dayToNextDayAges.length - 1; i++) {
      const currentAges = dayToNextDayAges[i];
      const nextDayAges = dayToNextDayAges[i + 1];
      expect(fishAgesAfterNextDay(currentAges)).toEqual(nextDayAges);
    }
  });
});
