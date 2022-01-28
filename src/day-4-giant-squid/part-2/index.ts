export {};
const {
  openBingoInput,
  checkOffInputs,
  checkHorizontalBingo,
  checkVerticalBingo,
  calculateBingoBoard,
} = require("../helper");

const findBingoedBoardIndexes = (
  checkedBoards: Array<Array<boolean>>
): Array<number> => {
  const bingoedBoardIndexes = [];
  let foundBingo = false;

  for (let n = 0; n < checkedBoards.length; n++) {
    foundBingo = false;
    const checkedBoard = checkedBoards[n];

    foundBingo =
      checkHorizontalBingo(checkedBoard) || checkVerticalBingo(checkedBoard);

    if (foundBingo) {
      bingoedBoardIndexes.push(n);
    }
  }

  return bingoedBoardIndexes;
};

const main = (
  inputNums: Array<number>,
  boards: Array<Array<number>>
): number => {
  let checkedBoards = boards.map((board) => board.map(() => false));
  let checkedBoardsIndexTracker = checkedBoards.map((board, index) => index);
  let lastBingoedBoardIndex: number;

  for (let i = 0; i < inputNums.length; i++) {
    const input = inputNums[i];
    checkedBoards = checkOffInputs(boards, checkedBoards, input);

    const bingoedBoardIndexes = findBingoedBoardIndexes(checkedBoards);

    bingoedBoardIndexes.forEach((bingoedIndex) => {
      checkedBoardsIndexTracker = checkedBoardsIndexTracker.filter(
        (index) => index !== bingoedIndex
      );
    });

    if (checkedBoardsIndexTracker.length == 1) {
      lastBingoedBoardIndex = checkedBoardsIndexTracker[0];
    }

    if (checkedBoardsIndexTracker.length == 0) {
      const orderedCallInputs = inputNums.slice(0, i + 1);
      const bingoedBoard = boards[lastBingoedBoardIndex];

      return calculateBingoBoard(orderedCallInputs, bingoedBoard);
    }
  }

  throw "Unable to determine last board to win the game";
};

const present = async () => {
  const [inputNums, boards] = await openBingoInput();
  console.log(
    "The bingo boards are -",
    boards.slice(0, 3),
    "\n...\n(only first 3 shown)\n"
  );
  console.log("The numbers in the order they are called are -", inputNums);
  console.log(
    "The result of the sum of all the unmarked numbers on the losing board multiplied by the last called number is-"
  );
  const result = main(inputNums, boards);
  console.log(result);
};

module.exports = { main, present };
