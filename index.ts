export {};
const day1SonarSweeps = require('./src/day-1-sonar-sweeps').present
const day2Dive = require('./src/day-2-dive').present
const day3BinaryDiagnostic = require('./src/day-3-binary-diagnostic').present

const main = async () => {

  await day1SonarSweeps()
  
  await day2Dive()
  
  await day3BinaryDiagnostic()
}

main()


