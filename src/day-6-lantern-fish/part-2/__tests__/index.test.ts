export {};
const { main } = require("../index");
const initialFishAges = [3, 4, 3, 1, 2];

describe("main", () => {
  it("returns the number of fish after 256 days", () => {
    expect(main(initialFishAges)).toEqual(26984457539);
  });
});
