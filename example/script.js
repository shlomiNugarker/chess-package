const { Game } = require('../dist/index')

const game = new Game()

// white turn
game.selectedCellCoord = { i: 1, j: 0 }
game.movePiece({ i: 3, j: 0 })
// game.switchTurn()

// black turn
game.selectedCellCoord = { i: 6, j: 1 }
game.movePiece({ i: 4, j: 1 })

// black eat
game.selectedCellCoord = { i: 3, j: 0 }
game.movePiece({ i: 4, j: 1 })

console.log('coords rook:[0,0]', game.board.board[0][0].getPossibleCoords())

// game.selectedCellCoord = { i: 0, j: 0 }
// game.movePiece({ i: 6, j: 0 })

console.table(game.board.board)
console.log(game)
