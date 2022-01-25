export {};
const fs = require('fs')

const openFile = async (filename) => fs.readFileSync(filename, 'utf8')

module.exports = { openFile }
