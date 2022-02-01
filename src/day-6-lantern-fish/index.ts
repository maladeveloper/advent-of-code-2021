export {};
const part1 = require("./part-1");
const part2 = require("./part-2");

const present = async () => {
  await part1.present();

  await part2.present();
};

module.exports = { present };
