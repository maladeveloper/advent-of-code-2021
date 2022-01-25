export {};
const openFile = require('../helper').openFile


const openInstructions = async () => {
  const instructionsRawData = await openFile('src/day-2-dive/instructions.txt')
  return instructionsRawData.split(/\r\n|\r|\n/)
}

module.exports = { openInstructions } 
