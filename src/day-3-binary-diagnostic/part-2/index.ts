export {};
const openBinaryNums = require('../helper').openBinaryNums

type BinaryDigit = '0' | '1'

const findBinaryDigitFrequency = ( binaryNums: Array<string>, index: number): Array<number> => {
  let zeroCounter = 0 
  let oneCounter = 0

  for(const binaryNum of binaryNums ){
    const binaryDigit = binaryNum[index]  

    if (binaryDigit == '0'){
      zeroCounter += 1 
    }else{
      oneCounter += 1
    }
  }

  return [zeroCounter, oneCounter]
}

const commonDigitLogic = ( zeroCounter: number, oneCounter: number, filterByMostCommon: boolean): BinaryDigit => {
  let filterBinaryDigit: BinaryDigit 

  if(zeroCounter > oneCounter){
    filterBinaryDigit = filterByMostCommon ? '0' : '1'
  } else if ( zeroCounter < oneCounter) {
    filterBinaryDigit = filterByMostCommon ? '1' : '0'
  } else {
    filterBinaryDigit = filterByMostCommon ? '1' : '0'
  }

  return filterBinaryDigit
}

const genericCalculator = ( binaryNums: Array<string>, minBinaryLen: number, filterByMostCommon: boolean  ): string => {
  let finalBinaryHolder = [...binaryNums]

  let i = 0
  while (finalBinaryHolder.length > 1 ){

    if( i >= minBinaryLen){
      throw 'Failed to narrow down to one binary number'
    }
    
    const [zeroCounter, oneCounter] = findBinaryDigitFrequency( finalBinaryHolder, i )

    const filterBinaryDigit = commonDigitLogic( zeroCounter, oneCounter, filterByMostCommon)
    
    finalBinaryHolder = finalBinaryHolder.filter( binaryNum => binaryNum[i] === filterBinaryDigit )

    i += 1 
  }

  return  finalBinaryHolder.pop()
}

const calculateOxyGenRating = ( binaryNums: Array<string>, minBinaryLen: number  ): string => genericCalculator(binaryNums, minBinaryLen, true)

const calculateCO2Scrub = ( binaryNums: Array<string>, minBinaryLen: number  ): string => genericCalculator(binaryNums, minBinaryLen, false)

const main = ( binaryNums: Array<string> ): number => {
  const minBinaryLen = Math.min(...(binaryNums.map( binaryNum => binaryNum.length )))
  const oxygenGenRating = calculateOxyGenRating( binaryNums, minBinaryLen)
  const cO2Scrub = calculateCO2Scrub( binaryNums, minBinaryLen)

  return parseInt(oxygenGenRating, 2) * parseInt(cO2Scrub, 2)
}

const present = async () => {
  const binaryNums = await openBinaryNums()
  console.log('The binary nums: ', binaryNums)
  const lifeSupportRating = main( binaryNums )
  console.log('The life support rating is:', lifeSupportRating)
}

module.exports = { main, calculateOxyGenRating, calculateCO2Scrub, present }

