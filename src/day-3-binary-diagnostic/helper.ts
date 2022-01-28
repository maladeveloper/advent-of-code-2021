export {};
const openFile = require("../helper").openFile;

const openBinaryNums = async () => {
  const rawBinaryNums = await openFile(
    "src/day-3-binary-diagnostic/binary_nums.txt"
  );
  return rawBinaryNums
    .split(/\r\n|\r|\n/)
    .filter((binaryNum) => binaryNum.length > 0);
};

module.exports = { openBinaryNums };
