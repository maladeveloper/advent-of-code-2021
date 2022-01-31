export {};
const openFile = require("../helper").openFile;

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

module.exports = { openRawPointMovements };
