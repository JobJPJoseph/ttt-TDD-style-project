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

    const index = Math.floor(Math.random() * validMoves.length);

    return validMoves[index];
  }

  static getWinningMoves(grid, symbol) {
    // Your code here
    // Things I notice:
      // Only { row: 0, col: 2 } is the only thing that should be considered bc it leads to an immediate win
      // Could we re-design the test

    /*
    We need the count of spaces to equal 1 and have all indexes to equal symbol || " "
      When its a count of one, that will be considered a winning move in the perspective of the computer
      or a blocking move if the opponent has winning move.

      When cpu has a winning move, it will be prioritized. When it doesn't and the opponent has one, it will be a blocking move.
      if Both dont have one, it will be a random move.
    */
      const winningMoves = [];

      // Check rows for winning moves
      for (let i = 0; i < grid.length; i++) {
        const emptyIndex = grid[i].indexOf(' ');

        if (grid[i].filter(cell => cell === ' ').length === 1 &&
            grid[i].every(cell => cell === symbol || cell === ' ')) {
          winningMoves.push({ row: i, col: emptyIndex });
        }
      }

      // Check columns for winning moves
      for (let j = 0; j < grid.length; j++) {
        const column = grid.map(row => row[j]);
        const emptyIndex = column.indexOf(' ');

        if (column.filter(cell => cell === ' ').length === 1 &&
            column.every(cell => cell === symbol || cell === ' ')) {
          winningMoves.push({ row: emptyIndex, col: j });
        }
      }

      // Check diagonals for winning moves
      const diagonal1 = grid.map((row, i) => row[i]);
      const diagonal2 = grid.map((row, i) => row[grid.length - 1 - i]);

      if (diagonal1.filter(cell => cell === ' ').length === 1 &&
          diagonal1.every(cell => cell === symbol || cell === ' ')) {
        const emptyIndex = diagonal1.indexOf(' ');
        winningMoves.push({ row: emptyIndex, col: emptyIndex });
      }

      if (diagonal2.filter(cell => cell === ' ').length === 1 &&
          diagonal2.every(cell => cell === symbol || cell === ' ')) {
        const emptyIndex = diagonal2.indexOf(' ');
        winningMoves.push({ row: emptyIndex, col: grid.length - 1 - emptyIndex });
      }

      return winningMoves;
  }

  static getSmartMove(grid, symbol) {
    // Your code here
    const winningMoves = this.getWinningMoves(grid, symbol);
    const opponentSymbol = symbol === 'X' ? 'O' : 'X';
    const opponentWinningMoves = this.getWinningMoves(grid, opponentSymbol);

    // Prioritize winning move for the computer
    if (winningMoves.length > 0) {
      return winningMoves[0];
    }

    // Block the opponent if they have a winning move
    if (opponentWinningMoves.length > 0) {
      return opponentWinningMoves[0];
    }

    // If neither side is about to win, make a random move
    return this.randomMove(grid);
  }

}

module.exports = ComputerPlayer;
