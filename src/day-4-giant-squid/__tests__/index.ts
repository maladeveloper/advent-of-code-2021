const { checkOffInputs } = require("../helper");

describe("checkOffInputs", () => {
  it("Checks off the input from the checked board", () => {
    const boards = [
      [1, 2, 3],
      [3, 1, 2],
      [1, 1, 1],
    ];
    const checkedBoard = boards.map((board) => board.map(() => false));
    const input = 1;

    const expectedCheckedBoard = [
      [true, false, false],
      [false, true, false],
      [true, true, true],
    ];
    expect(checkOffInputs(boards, checkedBoard, input)).toEqual(
      expectedCheckedBoard
    );
  });
});
