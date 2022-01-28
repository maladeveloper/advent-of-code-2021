export {};
const openInstructions = require("../helper").openInstructions;

const present = async () => {
  const instructions = await openInstructions();
  console.log("The instructions that were given-", instructions);
  const result = main(instructions);
  console.log(
    "The result of multiplying both final horizontal position and depth is:",
    result
  );
};

const main = (instructions: Array<string>): number => {
  let horizontal = 0;
  let depth = 0;

  for (const instruction of instructions) {
    const [direction, stepsStr] = instruction
      .split(/(\s+)/)
      .filter((e) => e.trim().length > 0);
    const steps = parseInt(stepsStr);

    switch (direction) {
      case "forward":
        horizontal += steps;
        break;

      case "down":
        depth += steps;
        break;

      case "up":
        depth -= steps;
        break;
    }
  }

  return horizontal * depth;
};

module.exports = { main, present };
