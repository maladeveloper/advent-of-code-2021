export {};
const day1SonarSweeps = require("./src/day-1-sonar-sweeps").present;
const day2Dive = require("./src/day-2-dive").present;
const day3BinaryDiagnostic = require("./src/day-3-binary-diagnostic").present;
const day4GiantSquid = require("./src/day-4-giant-squid").present;
const day5HydrothermalVenture =
  require("./src/day-5-hydrothermal-venture").present;
const day6LanternFish = require("./src/day-6-lantern-fish").present;
const day7TheTreacheryOfWhales =
  require("./src/day-7-the-treachery-of-whales").present;
const day8SevenSegmentSearch =
  require("./src/day-8-seven-segment-search").present;

const main = async () => {
  await day1SonarSweeps();

  await day2Dive();

  await day3BinaryDiagnostic();

  await day4GiantSquid();

  await day5HydrothermalVenture();

  await day6LanternFish();

  await day7TheTreacheryOfWhales();

  await day8SevenSegmentSearch();
};

main();
