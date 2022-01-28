export {};
const openFile = require('../helper').openFile


const openBingoInput = async () => {
  const rawBingoInput = await openFile('src/day-4-giant-squid/rawBingoInput')
  return rawBingoInput
}

module.exports = { openBingoInput } 
