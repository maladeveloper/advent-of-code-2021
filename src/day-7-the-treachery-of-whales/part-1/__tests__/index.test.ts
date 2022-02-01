export {};
const { main } = require("../index");
const initialPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

describe("main", () => {
  it("returns the fuel spent to align on position", () => {
    expect(main(initialPositions)).toEqual(37);
  });
});
