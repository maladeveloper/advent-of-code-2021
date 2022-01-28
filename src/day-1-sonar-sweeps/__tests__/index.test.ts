const main = require("../index").main;
const depthsToIncreases: Array<Array<number | Array<number>>> = [
  [[199, 200, 208, 210, 200, 207, 240, 269, 260, 263], 7],
];

describe("main", () => {
  it("returns the count of increases", () => {
    for (const depthsToIncrease of depthsToIncreases) {
      const depths = depthsToIncrease[0];
      const increases = depthsToIncrease[1];
      expect(main(depths)).toEqual(increases);
    }
  });
});
