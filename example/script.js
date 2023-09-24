const { Game } = require('../dist/index')

const game = new Game()

game.selectedCellCoord = { i: 1, j: 0 }
game.movePiece({ i: 3, j: 0 })
console.table(game.board.board)
console.log(game)
