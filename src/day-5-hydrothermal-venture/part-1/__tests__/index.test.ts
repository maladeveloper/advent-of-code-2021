export {};
const { main, findHorizontalAndVerticalPointsCovered } = require("../index");
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

describe("main", () => {
  it("returns the final score of the chosen board", () => {
    expect(main(rawPointMovements)).toEqual(5);
  });
});

describe("findHorizontalAndVerticalPointsCovered", () => {
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
      expect(findHorizontalAndVerticalPointsCovered(movement)).toEqual(
        pointsCovered
      );
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
      expect(findHorizontalAndVerticalPointsCovered(movement)).toEqual(
        pointsCovered
      );
    });
  });
});
