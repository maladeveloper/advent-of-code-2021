export {};
const openFile = require("../helper").openFile;

export interface Point {
  x: number;
  y: number;
}

export interface Movement {
  start: Point;
  end: Point;
}

const openRawPointMovements = async () => {
  const rawMovementsInput = await openFile(
    "src/day-5-hydrothermal-venture/movements_input.txt"
  );
  return rawMovementsInput
    .split(/\r\n|\r|\n/)
    .filter((rawMovement) => rawMovement.length > 0)
    .map((rawMovement) =>
      rawMovement
        .split(/->/)
        .map((strPoint) =>
          strPoint.split(/,/).map((xOrYStr) => parseInt(xOrYStr))
        )
    );
};

const convertToMovements = (
  rawPointMovements: Array<Array<Array<number>>>
): Array<Movement> => {
  return rawPointMovements.map((rawPointMovement): Movement => {
    const [[x1, y1], [x2, y2]] = rawPointMovement;
    const start: Point = { x: x1, y: y1 };
    const end: Point = { x: x2, y: y2 };
    return { start, end };
  });
};

const findRangeBetweenNums = (num1: number, num2: number): Array<number> => {
  const [startNum, endNum] = [num1, num2].sort((num1, num2) => num1 - num2);
  const range = [];
  for (let i = startNum; i < endNum + 1; i++) {
    range.push(i);
  }
  return range;
};

const findPointWitNumHits = (movements: Array<Movement>, pointsCoveredFunc) => {
  const pointToNumHits = {};

  for (const movement of movements) {
    const pointsCovered = pointsCoveredFunc(movement);
    for (const point of pointsCovered) {
      const { x, y } = point;
      try {
        const currentHits = pointToNumHits[x][y];
        if (currentHits) {
          pointToNumHits[x][y] += 1;
        } else {
          pointToNumHits[x][y] = 1;
        }
      } catch {
        pointToNumHits[x] = { [y]: 1 };
      }
    }
  }

  const pointsWithNumHits = Object.keys(pointToNumHits).map((x) => {
    return Object.keys(pointToNumHits[x]).map((y) => {
      const [xNum, yNum] = [parseInt(x), parseInt(y)];
      const point: Point = { x: xNum, y: yNum };
      const hits: number = pointToNumHits[x][y];
      return [point, hits];
    });
  });

  return pointsWithNumHits.flat(1);
};

const findPointsHitAboveThreshold = (
  pointsWithNumHits,
  thresholdHits: number
): Array<Point> => {
  return pointsWithNumHits
    .filter((pointToNumHit) => {
      const [, hits] = pointToNumHit;
      return hits >= thresholdHits;
    })
    .map((pointToNumHit) => {
      const [point, ,] = pointToNumHit;
      return point;
    });
};

module.exports = {
  openRawPointMovements,
  findRangeBetweenNums,
  convertToMovements,
  findPointWitNumHits,
  findPointsHitAboveThreshold,
};
