const { Game } = require('../dist/index')

const game = new Game()

// black turn
game.isBlackTurn = true
game.selectedCellCoord = { i: 1, j: 0 }
game.movePiece({ i: 3, j: 0 })

// // black turn
// game.isBlackTurn = true
// game.selectedCellCoord = { i: 6, j: 1 }
// game.movePiece({ i: 4, j: 1 })

// // white turn
// game.isBlackTurn = false
// game.selectedCellCoord = { i: 1, j: 7 }
// game.movePiece({ i: 3, j: 7 })

// // black eat
// game.isBlackTurn = true
// game.selectedCellCoord = { i: 3, j: 0 }
// game.movePiece({ i: 4, j: 1 })

// game.isBlackTurn = true
// console.log('coords rook:[0,0]', game.board.board[0][0].getPossibleCoords())
// game.selectedCellCoord = { i: 0, j: 0 }
// game.movePiece({ i: 6, j: 7 })

console.table(game.board.board)
// console.log(game)
