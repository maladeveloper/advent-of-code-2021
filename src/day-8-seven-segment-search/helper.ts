export {};
const openFile = require("../helper").openFile;

const openSignalsAndOutputs = async () => {
  const signalsAndOutputs = await openFile(
    "src/day-8-seven-segment-search/signals.txt"
  );
  return signalsAndOutputs
    .split(/\n/)
    .filter((signalAndOutput) => signalAndOutput.length > 0)
    .map((signalAndOutput) =>
      signalAndOutput
        .split(/\|/)
        .map((signalOrOutput) =>
          signalOrOutput.split(/\s+/).filter((pattern) => pattern.length > 0)
        )
    );
};

module.exports = { openSignalsAndOutputs };
