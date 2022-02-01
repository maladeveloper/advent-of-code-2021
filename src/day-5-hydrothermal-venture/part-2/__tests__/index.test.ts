export {};
const { main, findPointsCovered } = require("../index");
const rawPointMovements = [
  [
    [0, 9],
    [5, 9],
  ],
  [
    [8, 0],
    [0, 8],
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
    [6, 4],
    [2, 0],
  ],
  [
    [0, 9],
    [2, 9],
  ],
  [
    [3, 4],
    [1, 4],
  ],
  [
    [0, 0],
    [8, 8],
  ],
  [
    [5, 5],
    [8, 2],
  ],
];

describe("main", () => {
  it("returns the number of points that have been hit above a threshold of 2", () => {
    expect(main(rawPointMovements)).toEqual(12);
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

  describe("when diagonal movement is made", () => {
    it("returns an array of points that a movement hits", () => {
      const movement = { start: { x: 9, y: 7 }, end: { x: 7, y: 9 } };
      const pointsCovered = [
        { x: 7, y: 9 },
        { x: 8, y: 8 },
        { x: 9, y: 7 },
      ];

      expect(findPointsCovered(movement)).toEqual(pointsCovered);
    });
  });
});
