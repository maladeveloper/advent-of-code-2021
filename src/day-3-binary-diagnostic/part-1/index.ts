export {};
const openBinaryNums = require('../helper').openBinaryNums


const present = async () => {
  const binaryNums = await openBinaryNums()
  console.log('The binary nums: ', binaryNums)
  const powerConsumption = main(binaryNums)
  console.log('The power consumption is: ', powerConsumption)
}


const main = ( binaryNums: Array<string> ): number => {

  const [ gamma, epsilon ]  = calculateGammaAndEpsilon(binaryNums)

  return  parseInt(gamma, 2) * parseInt(epsilon, 2)
  
}

const calculateGammaAndEpsilon = ( binaryNums: Array<string> ): Array<string> => {
  const minBinaryLen = Math.min(...(binaryNums.map( binaryNum => binaryNum.length )))
  let gamma = ''
  let epsilon = ''

  for (let i = 0; i < minBinaryLen; i++) {
    let zeroCounter = 0 
    let oneCounter = 0
    for(const binaryNum of binaryNums ){
      const binaryDigit = binaryNum[i]  

      if (binaryDigit == '0'){
        zeroCounter += 1 
      }else{
        oneCounter += 1
      }
    }

    // Cannot find most common bit if they are equally as common
    if(zeroCounter == oneCounter){
      throw 'Same number of 0s and 1s thus cannot find most common bit'
    }
    
    if( zeroCounter > oneCounter){
      gamma += '0'
      epsilon += '1'
    } else {
      gamma += '1'
      epsilon += '0'
    }
  }


  return [gamma, epsilon]
}

module.exports = { main, present }

