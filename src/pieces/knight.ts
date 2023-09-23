import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { Piece } from './piece'

// KNIGHT_WHITE:
export class N extends Piece {
  name = 'N'
  shape = '♘'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }
  getPossibleCoords = (): Coord[] => getAllPossibleCoordsKnight(this)
}
// KNIGHT_BLACK:
export class n extends Piece {
  name = 'n'
  shape = '♞'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }
  getPossibleCoords = (): Coord[] => getAllPossibleCoordsKnight(this)
}

function getAllPossibleCoordsKnight(self: n | N) {
  const board = self.game.board.board
  const pieceCoord = self.coord

  const res: { i: number; j: number }[] = []

  const possibleSteps = [
    { i: -2, j: -1 },
    { i: -2, j: 1 },
    { i: -1, j: 2 },
    { i: -1, j: -2 },
    { i: 1, j: -2 },
    { i: 1, j: 2 },
    { i: 2, j: 1 },
    { i: 2, j: -1 },
  ]

  for (let k = 0; k < possibleSteps.length; k++) {
    const diffI = possibleSteps[k].i
    const diffJ = possibleSteps[k].j
    const nextCoord = { i: pieceCoord.i + diffI, j: pieceCoord.j + diffJ }

    if (
      nextCoord.i >= 0 &&
      nextCoord.i < 8 &&
      nextCoord.j >= 0 &&
      nextCoord.j < 8
    ) {
      if (self.game.isEmptyCell(nextCoord)) res.push(nextCoord)
      else {
        const piece = board[nextCoord.i][nextCoord.j]
        if (!self.game.isColorPieceWorthCurrPlayerColor(piece))
          res.push(nextCoord) //-> eatable  coord
      }
    }
  }
  return res
}
