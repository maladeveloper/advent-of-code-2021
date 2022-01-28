export {};
const { main, checkOffInputs, findBingoedBoardIndex } = require('../index')
const bingoChosenNums = [ 7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1]
const bingoBoards = [ 
  [22, 13, 17, 11,  0, 8,  2, 23,  4, 24, 21,  9, 14, 16,  7, 6, 10,  3, 18,  5, 1, 12, 20, 15, 19],
  [3, 15,  0,  2, 22, 9, 18, 13, 17,  5, 19,  8,  7, 25, 23, 20, 11, 10, 24,  4, 14, 21, 16, 12,  6],
  [14, 21, 17, 24,  4, 10, 16, 15,  9, 19, 18,  8, 23, 26, 20, 22, 11, 13,  6,  5, 2,  0, 12,  3,  7]
]
const finalScore = 4512
const checkedBoards = [
  [
    true, false, false, false, true,
    false, true, false, false, false,
    true, false, true, false, false,
    false, true, false, true, false,
    false, false, true, false, true
  ],
  [
    true, false, false, false, true,
    false, true, false, false, false,
    true, false, true, true, true,
    false, true, true, true, true,
    false, false, true, false, true
  ],
  [
    true, false, false, false, true,
    false, true, false, false, false,
    true, false, true, false, false,
    false, true, false, true, false,
    false, false, true, false, true
  ],
]

describe('main', () => {
  it.only('returns the final score of the chosen board', () => {
    expect(main(bingoChosenNums, bingoBoards)).toEqual(finalScore)
  })
})

describe('checkOffInputs', () => {
  it('Checks off the input from the checked board', () => {
    const boards = [
      [1, 2, 3], 
      [3, 1, 2],
      [1, 1, 1]
    ]
    const checkedBoard = boards.map( board => board.map( number => false ) ) 
    const input = 1

    const expectedCheckedBoard = [
      [true, false, false],
      [false, true, false],
      [true, true, true]
    ]
    expect( checkOffInputs( boards, checkedBoard, input)).toEqual(expectedCheckedBoard)
    
  })
})

describe('findBingoedBoardIndex', () => {
  describe('when there is no bingo on any of the boards', () => {
    it('returns hasFoundBingo as false and null bingoBoardIndex', () => {
      const [hasFoundBingo, bingoBoardIndex]  = findBingoedBoardIndex(checkedBoards)
      expect(hasFoundBingo).toEqual( false)
      expect(bingoBoardIndex).toEqual( null)
    })
  })

  describe('when one table has a horizontal bingo', () => {
    it('return hasFoundBingo as true and returns the correct bingoBoardIndex', () => {
      const hasHorizontalCheckedBoard = [
        ...checkedBoards.slice(0,1),
        [
          true, false, false, false, true,
          false, true, false, false, false,
          true, true, true, true, true,
          false, true, false, true, false,
          false, false, true, false, true
        ],
        ...checkedBoards.slice(1, checkedBoards.length)
      ]

      const [hasFoundBingo, bingoBoardIndex]  = findBingoedBoardIndex(hasHorizontalCheckedBoard)
      expect(hasFoundBingo).toEqual(true)
      expect(bingoBoardIndex).toEqual(1)
    })
  })

  describe('when more than one table has a horizontal bingo', () => {
    it('throws an error', () => {
      const doubleBingoBoard = [
        [
          true, false, false, false, true,
          false, true, false, false, false,
          true, true, true, true, true,
          false, true, false, true, false,
          false, false, true, false, true
        ],
        [
          true, false, false, false, true,
          false, true, false, false, false,
          true, true, true, true, true,
          false, true, false, true, false,
          false, false, true, false, true
        ],
        ...checkedBoards.slice(1, checkedBoards.length)
      ]

      expect(() => findBingoedBoardIndex(doubleBingoBoard)).toThrow(
        'Bingo across multiple boards have been found and is unclear which board called first!'
      )
    })
  })

  describe('when one table has a vertical bingo', () => {
    it('return hasFoundBingo as true and returns the correct bingoBoardIndex', () => {
      const hasHorizontalCheckedBoard = [
        ...checkedBoards.slice(0,1),
        [
          true, false, false, true, true,
          false, true, false, true, false,
          true, false, false, true, true,
          false, true, false, true, false,
          false, false, true, true, true
        ],
        ...checkedBoards.slice(1, checkedBoards.length)
      ]

      const [hasFoundBingo, bingoBoardIndex]  = findBingoedBoardIndex(hasHorizontalCheckedBoard)
      expect(hasFoundBingo).toEqual(true)
      expect(bingoBoardIndex).toEqual(1)
    })
  })

  describe('when more than one table has a vertical bingo', () => {
    it('throws an error', () => {
      const doubleBingoBoard = [
        [
          true, false, false, true, true,
          false, true, false, true, false,
          true, false, false, true, true,
          false, true, false, true, false,
          false, false, true, true, true
        ],
        [
          true, false, false, true, true,
          false, true, false, true, false,
          true, false, false, true, true,
          false, true, false, true, false,
          false, false, true, true, true
        ],
        ...checkedBoards.slice(1, checkedBoards.length)
      ]

      expect(() => findBingoedBoardIndex(doubleBingoBoard)).toThrow(
        'Bingo across multiple boards have been found and is unclear which board called first!'
      )
    })
  })
})


