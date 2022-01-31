export {};
const { main, convertToMovements, findPointsCovered } = require("../index");
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

describe("main", () => {
  it("returns the final score of the chosen board", () => {
    expect(main(rawPointMovements)).toEqual(5);
  });
});

describe("convertToMovements", () => {
  it("returns an array of movements from raw points movements", () => {
    expect(convertToMovements(rawPointMovements).sort()).toEqual(
      movements.sort()
    );
  });
});

describe("findPointsCovered", () => {
  describe("when horizontal movement is made", () => {
    it("returns an array of points that a movement hits", () => {
      const movement = { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } };
      const pointsCovered = [
        { x: 0, y: 9 },
        { x: 1, y: 9 },
        { x: 2, y: 9 },
        { x: 3, y: 9 },
        { x: 4, y: 9 },
        { x: 5, y: 9 },
      ];
      expect(findPointsCovered(movement)).toEqual(pointsCovered);
    });
  });
  describe("when vertical movement is made", () => {
    it("returns an array of points that a movement hits", () => {
      const movement = { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } };
      const pointsCovered = [
        { x: 7, y: 0 },
        { x: 7, y: 1 },
        { x: 7, y: 2 },
        { x: 7, y: 3 },
        { x: 7, y: 4 },
      ];
      expect(findPointsCovered(movement)).toEqual(pointsCovered);
    });
  });
});
