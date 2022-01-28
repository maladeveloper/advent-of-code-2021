export {};
const {
  openBingoInput,
  checkOffInputs,
  checkHorizontalBingo,
  checkVerticalBingo,
  calculateBingoBoard,
} = require("../helper");

interface BingoReturnInfo {
  hasFoundBingo: boolean;
  bingoBoardIndex: number;
}

const findBingoedBoardIndex = (
  checkedBoards: Array<Array<boolean>>
): BingoReturnInfo => {
  let foundFirstBingo = false;
  let bingoBoardIndex: number = null;
  let foundBingo = false;

  for (let n = 0; n < checkedBoards.length; n++) {
    foundBingo = false;
    const checkedBoard = checkedBoards[n];

    foundBingo =
      checkHorizontalBingo(checkedBoard) || checkVerticalBingo(checkedBoard);

    if (foundBingo) {
      if (foundFirstBingo) {
        throw "Bingo across multiple boards have been found and is unclear which board called first!";
      }
      foundFirstBingo = true;
      bingoBoardIndex = n;
    }
  }

  const bingoReturninfo: BingoReturnInfo = {
    hasFoundBingo: foundFirstBingo,
    bingoBoardIndex,
  };
  return bingoReturninfo;
};

const main = (
  inputNums: Array<number>,
  boards: Array<Array<number>>
): number => {
  let checkedBoards = boards.map((board) => board.map(() => false));

  for (let i = 0; i < inputNums.length; i++) {
    const input = inputNums[i];
    checkedBoards = checkOffInputs(boards, checkedBoards, input);

    const { hasFoundBingo, bingoBoardIndex } =
      findBingoedBoardIndex(checkedBoards);

    if (hasFoundBingo) {
      const orderedCallInputs = inputNums.slice(0, i + 1);
      const bingoedBoard = boards[bingoBoardIndex];

      return calculateBingoBoard(orderedCallInputs, bingoedBoard);
    }
  }
  throw "No Boards have bingo";
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
    "The result of the sum of all the unmarked numbers on the winning board multiplied by the last called number is-"
  );
  const result = main(inputNums, boards);
  console.log(result);
};

module.exports = { main, findBingoedBoardIndex, present };
