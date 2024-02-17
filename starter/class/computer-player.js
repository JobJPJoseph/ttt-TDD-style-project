
class ComputerPlayer {

  static getValidMoves(grid) {
    // Your code here
    /*
    The problem is designed in a obscure way
    We are suppose to return an array type

    Within the array are elements needs to be an object that
    contains {row: i, col: j}
    */

    const validMoves = [];

    for (let i = 0; i < grid.length; i++) {

      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === " ") validMoves.push({row: i, col: j});
      }

    }

    return validMoves;
  }

  static randomMove(grid) {
    // Your code here

    const validMoves = this.getValidMoves(grid);


  }

  static getWinningMoves(grid, symbol) {

    // Your code here

  }

  static getSmartMove(grid, symbol) {

    // Your code here

  }

}

module.exports = ComputerPlayer;
