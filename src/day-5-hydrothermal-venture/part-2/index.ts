export {};
const {
  findPointsHitAboveThreshold,
  openRawPointMovements,
  findRangeBetweenNums,
  convertToMovements,
  findPointWitNumHits,
} = require("../helper");
import { Point, Movement } from "../helper";

const linearEquationFormula = (start: Point, end: Point) => {
  const gradient = (start.y - end.y) / (start.x - end.x);

  return (x) => gradient * (x - start.x) + start.y;
};

const isVerticalLine = (start: Point, end: Point): boolean => start.x == end.x;

const findPointsCovered = (movement: Movement): Array<Point> => {
  const { start, end } = movement;

  if (isVerticalLine(start, end)) {
    const verticalRange = findRangeBetweenNums(start.y, end.y);
    return verticalRange.map((y) => {
      return { x: start.x, y };
    });
  }

  const linearEquation = linearEquationFormula(start, end);
  const horizontalRange = findRangeBetweenNums(start.x, end.x);
  return horizontalRange.map((x) => {
    return { x, y: linearEquation(x) };
  });
};

const main = (rawPointMovements: Array<Array<Array<number>>>): number => {
  const movements = convertToMovements(rawPointMovements);
  const pointsWithNumHits = findPointWitNumHits(movements, findPointsCovered);
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
    "Considering vertical, horizontal, AND diagnonal lines, the number of points where more than 2 lines overlap is:",
    result
  );
};

module.exports = {
  main,
  present,
  convertToMovements,
  findPointsCovered,
};
