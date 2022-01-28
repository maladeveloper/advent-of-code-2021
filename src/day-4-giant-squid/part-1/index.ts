export {};
const openBinaryNums = require('../helper').openBinaryNums
const boardWidthHeightSize = 5

interface BingoReturnInfo {
 hasFoundBingo: boolean;
 bingoBoardIndex: number;
}


const checkAuthenticBingoBoards = ( boards: Array<Array<number>>): void => {
  
  for(const board of boards) {
    const boardLen = board.length
    const authenticBoard = (boardLen / boardWidthHeightSize == 5)

    if(!authenticBoard){
      throw 'The board does not conform to the 5x5 standard bingo board size !' 
    }
  }
}

const checkOffInputs = ( boards: Array<Array<number>>,checkedBoards: Array<Array<boolean>>, input: number): Array<Array<boolean>> => {
 
  const newCheckedBoards = [...checkedBoards]
  for(let j=0; j < newCheckedBoards.length; j++){
    const board = boards[j]
    const newCheckedBoard = newCheckedBoards[j]
    for(let i = 0; i < newCheckedBoard.length; i ++){
      if(board[i] === input){
        newCheckedBoard[i] = true
      }
    }
  }
  return newCheckedBoards
}

const checkHorizontalBingo = ( checkedBoard: Array<boolean> ): boolean => {
  for (let i = 0, j = checkedBoard.length; i < j; i += boardWidthHeightSize) {
    const boardRow = checkedBoard.slice(i, i + boardWidthHeightSize);
    const foundBingo = boardRow.every( checked => checked === true)

    if(foundBingo){
      return true
    }
  }
  return false
}

const checkVerticalBingo = ( checkedBoard: Array<boolean> ): boolean => {

  for( let i = 0; i < boardWidthHeightSize; i++ ){
    const boardCol: Array<boolean> = []
    for ( let j = 0; j < checkedBoard.length; j += boardWidthHeightSize){
      boardCol.push(checkedBoard[i + j])
    }
    const foundBingo = boardCol.every( checked => checked === true)

    if(foundBingo){
      return true
    }
  }
  return false
}


const findBingoedBoardIndex = ( checkedBoards: Array<Array<boolean>> ): BingoReturnInfo => {
  let foundFirstBingo = false 
  let bingoBoardIndex: number = null 
  let foundBingo = false

  for( let n = 0; n < checkedBoards.length; n ++){
    foundBingo = false
    const checkedBoard = checkedBoards[n]

    foundBingo = checkHorizontalBingo( checkedBoard ) || checkVerticalBingo( checkedBoard)

    if(foundBingo){
      if(foundFirstBingo){
        throw 'Bingo across multiple boards have been found and is unclear which board called first!'
      }
      foundFirstBingo = true
      bingoBoardIndex = n
    }
  }

  const bingoReturninfo: BingoReturnInfo = {
    hasFoundBingo: foundFirstBingo, 
    bingoBoardIndex
  }
  return bingoReturninfo
}

const calculateBingoBoard = ( orderedCallInputs: Array<number>, board: Array<number>): number => {
  const lastCalledInput = orderedCallInputs[orderedCallInputs.length - 1]
  const unmarkedBoardNumbers = board.filter( boardNum => !orderedCallInputs.includes(boardNum))
  const unmarkedBoardNumbersSum = unmarkedBoardNumbers.reduce((partialSum, num) => partialSum + num, 0)

  return unmarkedBoardNumbersSum * lastCalledInput
}

const main = (inputNums: Array<number>, boards: Array<Array<number>>): number => {
  checkAuthenticBingoBoards(boards)

  let checkedBoards = boards.map( board => board.map( number => false ))

  for(let i = 0; i < inputNums.length; i++){
    const input = inputNums[i]
    checkedBoards = checkOffInputs(boards, checkedBoards, input)

    const {hasFoundBingo, bingoBoardIndex}  = findBingoedBoardIndex(checkedBoards)

    if(hasFoundBingo) {
      const orderedCallInputs = inputNums.slice(0, i + 1)
      const bingoedBoard = boards[bingoBoardIndex]

      return calculateBingoBoard(orderedCallInputs, bingoedBoard)
    }
  }
  throw 'No Boards have bingo'
}

const present = async () => {
}


module.exports = { main, checkOffInputs, findBingoedBoardIndex, present }

