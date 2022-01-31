export {};
const { openRawPointMovements } = require("../helper");

interface Point {
  x: number;
  y: number;
}

interface Movement {
  start: Point;
  end: Point;
}

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

const findPointsCovered = (movement: Movement): Array<Point> => {
  const { start, end } = movement;
  const horizontalRange = findRangeBetweenNums(start.x, end.x);
  const verticalRange = findRangeBetweenNums(start.y, end.y);
  const points: Array<Point> = [];

  horizontalRange.forEach((x) => {
    verticalRange.forEach((y) => {
      points.push({ x, y });
    });
  });

  return points;
};

const filterOnlyHorizontalAndVerticalMovements = (
  movements: Array<Movement>
): Array<Movement> => {
  return movements.filter((movement) => {
    const { start, end } = movement;
    return start.x === end.x || start.y === end.y;
  });
};

const findPointWitNumHits = (movements: Array<Movement>) => {
  const pointToNumHits = {};

  for (const movement of movements) {
    const pointsCovered = findPointsCovered(movement);
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

const main = (rawPointMovements: Array<Array<Array<number>>>): number => {
  const allMovements = convertToMovements(rawPointMovements);
  const movements = filterOnlyHorizontalAndVerticalMovements(allMovements);
  const pointsWithNumHits = findPointWitNumHits(movements);
  const thresholdHits = 2;

  const thresholdHitPoints = pointsWithNumHits
    .filter((pointToNumHit) => {
      const [, hits] = pointToNumHit;
      return hits >= thresholdHits;
    })
    .map((pointToNumHit) => {
      const [point, ,] = pointToNumHit;
      return point;
    });

  const numPointsAboveHitThreshold = thresholdHitPoints.length;
  return numPointsAboveHitThreshold;
};

const present = async () => {
  const rawPointMovements = await openRawPointMovements();
  console.log(
    "The point movements that were given are:",
    rawPointMovements.slice(0, 5),
    "\n...\n(many more)\n"
  );
  const result = main(rawPointMovements);
  console.log(
    "Considering only the vertical and horizontal lines, the number of points where more than 2 lines overlap is:",
    result
  );
};

module.exports = { main, present, convertToMovements, findPointsCovered };
