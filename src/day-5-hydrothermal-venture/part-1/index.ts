export {};
const {
  findPointsHitAboveThreshold,
  openRawPointMovements,
  findRangeBetweenNums,
  convertToMovements,
  findPointWitNumHits,
} = require("../helper");
import { Point, Movement } from "../helper";

const findHorizontalAndVerticalPointsCovered = (
  movement: Movement
): Array<Point> => {
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

const main = (rawPointMovements: Array<Array<Array<number>>>): number => {
  const allMovements = convertToMovements(rawPointMovements);
  const movements = filterOnlyHorizontalAndVerticalMovements(allMovements);
  const pointsWithNumHits = findPointWitNumHits(
    movements,
    findHorizontalAndVerticalPointsCovered
  );
  const thresholdHits = 2;

  const thresholdHitPoints = findPointsHitAboveThreshold(
    pointsWithNumHits,
    thresholdHits
  );

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

module.exports = {
  main,
  present,
  convertToMovements,
  findHorizontalAndVerticalPointsCovered,
};
