export {};
const { openSignalsAndOutputs } = require("../helper");

const uniqueSegmentLen = [2, 4, 3, 7];

const main = (signalsAndOutputs: Array<Array<Array<string>>>): number => {
  let numAppearances = 0;
  for (const signalAndOutput of signalsAndOutputs) {
    const [, output] = signalAndOutput;

    for (const pattern of output) {
      if (uniqueSegmentLen.includes(pattern.length)) {
        numAppearances += 1;
      }
    }
  }

  return numAppearances;
};

const present = async () => {
  const signalsAndOutputs = await openSignalsAndOutputs();
  const result = main(signalsAndOutputs);
  console.log("The times the digits 1, 4, 7 and 8 appear are:", result);
};

module.exports = {
  main,
  present,
};
