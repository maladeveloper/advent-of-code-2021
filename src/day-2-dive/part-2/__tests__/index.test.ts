export {};
const main = require("../index").main;
const instructionsToResults: Array<Array<Array<string> | number>> = [
  [["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"], 900],
];

describe("main", () => {
  it("calculates multiplication of the final horizontal position and depth", () => {
    for (const instructionsToResult of instructionsToResults) {
      const instructions = instructionsToResult[0];
      const result = instructionsToResult[1];
      expect(main(instructions)).toEqual(result);
    }
  });
});
