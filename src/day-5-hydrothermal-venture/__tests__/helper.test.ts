export {};
const { convertToMovements } = require("../helper");
const rawPointMovements = [
  [
    [0, 9],
    [5, 9],
  ],
  [
    [9, 4],
    [3, 4],
  ],
  [
    [2, 2],
    [2, 1],
  ],
  [
    [7, 0],
    [7, 4],
  ],
  [
    [0, 9],
    [2, 9],
  ],
  [
    [3, 4],
    [1, 4],
  ],
];

const movements = [
  { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } },
  { start: { x: 9, y: 4 }, end: { x: 3, y: 4 } },
  { start: { x: 2, y: 2 }, end: { x: 2, y: 1 } },
  { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } },
  { start: { x: 0, y: 9 }, end: { x: 2, y: 9 } },
  { start: { x: 3, y: 4 }, end: { x: 1, y: 4 } },
];

describe("convertToMovements", () => {
  it("returns an array of movements from raw points movements", () => {
    expect(convertToMovements(rawPointMovements).sort()).toEqual(
      movements.sort()
    );
  });
});
