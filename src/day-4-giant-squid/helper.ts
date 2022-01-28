export {};
const openFile = require("../helper").openFile;

const boardWidthHeightSize = 5;

const checkAuthenticBingoBoards = (boards: Array<Array<number>>): void => {
  for (const board of boards) {
    const boardLen = board.length;
    const authenticBoard = boardLen / boardWidthHeightSize == 5;

    if (!authenticBoard) {
      throw "The board does not conform to the 5x5 standard bingo board size !";
    }
  }
};

const openBingoInput = async () => {
  const rawBingoInput = await openFile("src/day-4-giant-squid/bingo_input.txt");
  const bingoInput = rawBingoInput
    .split(/\r?\n/)
    .filter((input) => input.length > 0);
  const inputNums = bingoInput
    .shift()
    .split(/,/)
    .map((input) => parseInt(input));
  const boards: Array<Array<number>> = [];

  for (let i = 0, j = bingoInput.length; i < j; i += boardWidthHeightSize) {
    const seperatedBoard = bingoInput.slice(i, i + boardWidthHeightSize);
    const board = seperatedBoard
      .map((row) =>
        row.split(/\s+/).filter((boardInput) => boardInput.length > 0)
      )
      .flat()
      .map((boardInput) => parseInt(boardInput));

    boards.push(board);
  }

  checkAuthenticBingoBoards(boards);

  return [inputNums, boards];
};

const checkOffInputs = (
  boards: Array<Array<number>>,
  checkedBoards: Array<Array<boolean>>,
  input: number
): Array<Array<boolean>> => {
  const newCheckedBoards = [...checkedBoards];
  for (let j = 0; j < newCheckedBoards.length; j++) {
    const board = boards[j];
    const newCheckedBoard = newCheckedBoards[j];
    for (let i = 0; i < newCheckedBoard.length; i++) {
      if (board[i] === input) {
        newCheckedBoard[i] = true;
      }
    }
  }
  return newCheckedBoards;
};

const checkHorizontalBingo = (checkedBoard: Array<boolean>): boolean => {
  for (let i = 0, j = checkedBoard.length; i < j; i += boardWidthHeightSize) {
    const boardRow = checkedBoard.slice(i, i + boardWidthHeightSize);
    const foundBingo = boardRow.every((checked) => checked === true);

    if (foundBingo) {
      return true;
    }
  }
  return false;
};

const checkVerticalBingo = (checkedBoard: Array<boolean>): boolean => {
  for (let i = 0; i < boardWidthHeightSize; i++) {
    const boardCol: Array<boolean> = [];
    for (let j = 0; j < checkedBoard.length; j += boardWidthHeightSize) {
      boardCol.push(checkedBoard[i + j]);
    }
    const foundBingo = boardCol.every((checked) => checked === true);

    if (foundBingo) {
      return true;
    }
  }
  return false;
};

const calculateBingoBoard = (
  orderedCallInputs: Array<number>,
  board: Array<number>
): number => {
  const lastCalledInput = orderedCallInputs[orderedCallInputs.length - 1];
  const unmarkedBoardNumbers = board.filter(
    (boardNum) => !orderedCallInputs.includes(boardNum)
  );
  const unmarkedBoardNumbersSum = unmarkedBoardNumbers.reduce(
    (partialSum, num) => partialSum + num,
    0
  );

  return unmarkedBoardNumbersSum * lastCalledInput;
};

module.exports = {
  openBingoInput,
  boardWidthHeightSize,
  checkOffInputs,
  checkVerticalBingo,
  checkHorizontalBingo,
  calculateBingoBoard,
};
