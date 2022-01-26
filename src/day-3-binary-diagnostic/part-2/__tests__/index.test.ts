export {};
const { main, calculateOxyGenRating, calculateCO2Scrub } = require('../index')
const testBinaryArr = [ '00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010',]
const binaryNumsToLifeSupport: Array<Array< number | Array<string> >> = [
  [
    testBinaryArr, 230
  ],
  [
    [ '0010010100101', '111100', '1111111'], 151003
  ]
]

describe('main', () => {
  it('returns the life support rating ', () => {
    for ( const binaryNumToLifeSupport of binaryNumsToLifeSupport) {
      const [ binaryNums, lifeSupport ] = binaryNumToLifeSupport
      expect(main(binaryNums)).toEqual(lifeSupport)
    }
  })
})

describe('calculateOxyGenRating', () => {
  it('returns the binary that is the oxygen generator rating', () => {
    const minBinaryLen = Math.min(...(testBinaryArr.map( binaryNum => binaryNum.length )))

    expect(calculateOxyGenRating(testBinaryArr, minBinaryLen)).toEqual('10111')
  })
})

describe('calculateCO2Scrub', () => {
  it('returns the binary that is the CO2 scrubber rating', () => {
    const minBinaryLen = Math.min(...(testBinaryArr.map( binaryNum => binaryNum.length )))

    expect(calculateCO2Scrub(testBinaryArr, minBinaryLen)).toEqual('01010')
  })
})

