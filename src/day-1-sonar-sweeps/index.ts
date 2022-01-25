export {};

const present = () => {
  const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
  console.log('The depths are', depths)
  const numIncreases = main(depths)
  console.log('Number of times the depths increase is:', numIncreases)
}

const main = ( depths: Array<number> ): number => {
  let counter = 0

  for( let i = 0; i < depths.length - 1; i++){
    const currentDepth = depths[i]
    const nextDepth = depths[i + 1]
    if( nextDepth > currentDepth ) {
      counter += 1
    }
  }

  return counter 
}

module.exports = { main, present }

