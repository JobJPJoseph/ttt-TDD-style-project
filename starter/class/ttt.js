const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
      // Make sure with each command we render
      /*
      */
    Screen.addCommand('t', 'test command (remove)', TTT.testCommand);

    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static horizontal(grid, symbol) {
    // Let's try this the new way

    for(let i = 0; i < grid.length; i++) {
      if(grid[i].every((cell) => cell === symbol)) return symbol;
    }

    return false;
  }

  static vertical(grid, symbol) {

    for(let j = 0; j < grid.length; j++) {
      const column = grid.map((row) => row[j]);

      if(column.every((cell) => cell === symbol)) return symbol;
    }

    return false;
  }

  static diagonal(grid, symbol) {
    // This one is also the same but make note that the column will be separate this time

    let j = 0;
    const tAcross = [];

    let k = grid.length - 1;
    const bAcross = [];

    // top left => bottom right
    for (let i = 0; i < grid.length; i++) {
      tAcross.push(grid[i][j]);
      j++;
    }

    // top right => bottom left
    for (let i = 0; i < grid.length; i++) {
      bAcross.push(grid[i][k]);
      k--;
    }

    if(tAcross.every(cell => cell === symbol)) return symbol;
    if(bAcross.every(cell => cell === symbol)) return symbol;

    return false;
  }

  static getDirections(grid, symbol) {
    if (this.horizontal(grid, symbol)) return symbol;
    if (this.vertical(grid, symbol)) return symbol;
    if (this.diagonal(grid, symbol)) return symbol;
    return false;
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    const xWin = this.getDirections(grid, "X");
    if (xWin) return "X";
    // Return 'O' if player O wins
    const oWin = this.getDirections(grid, "O");
    if (oWin) return "O";
    // Return 'T' if the game is a tie
    if((this.isSpaces(grid) === 0) && (xWin === false && oWin === false)) return "T";
      // If count of spaces and "X" and "O" are false
    // Return false if the game has not ended

    // The game won't end till the number of empty spaces hits zero.
      // possible exits:
        // When player X wins: return X
        // When player O wins: return O
        // When its a tie, the game ends: returns T
        // Game Over isn't actually achievable bc logically the game is over regarless of option bc of Screen.quit()
          // We could create a quit command in which we do call endGame with no argument to get Game Over

    return false;
  }

  static flatten(grid) {
    const flattened = [];

    for(let i = 0; i < grid.length; i++) {
      flattened.push(...grid[i]);
    }

    return flattened;
  }

  static isSpaces(grid) {
    return this.flatten(grid).filter(isSpace => isSpace === " ").length;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
