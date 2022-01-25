export {};
const main = require('../index').main
const binaryNumsToPower: Array<Array< number | Array<string> >> = [
  [
    [ '00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010',], 198
  ],
  [
    [ '0010010100101', '111100', '1111111'], 122
  ]
]

describe('main', () => {
  it('returns the power consumption', () => {
    for ( const binaryNumToPower of binaryNumsToPower) {
      const [ binaryNums, power ] = binaryNumToPower
      expect(main(binaryNums)).toEqual(power)
    }
  })
})

