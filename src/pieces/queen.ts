import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { Piece } from './piece'

// QUEEN_WHITE:
export class Q extends Piece {
  name = 'Q'
  shape = '♕'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }

  getPossibleCoords = (): Coord[] => getAllPossibleCoordsQueen(this)
}

// QUEEN_BLACK:
export class q extends Piece {
  name = 'q'
  shape = '♛'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }

  getPossibleCoords = (): Coord[] => getAllPossibleCoordsQueen(this)
}

function getAllPossibleCoordsQueen(
  self: Q | q,
  isAskForEatenCoords: boolean = false
) {
  const board = self.game.board.board
  const pieceCoord = self.coord
  const res: Coord[] = []

  const possibleDir = [
    // Bishop:
    { i: 1, j: -1 }, //bottomLeft
    { i: 1, j: 1 }, //bottomRight
    { i: -1, j: -1 }, //topLeft
    { i: -1, j: 1 }, //topRight
    // Rook:
    { i: -1, j: 0 }, //to top
    { i: 1, j: 0 }, // to bottom
    { i: 0, j: 1 }, // to right
    { i: 0, j: -1 }, // to left
  ]

  for (let k = 0; k < possibleDir.length; k++) {
    for (let i = 1; i <= 8; i++) {
      const diffI = i * possibleDir[k].i
      const diffJ = i * possibleDir[k].j
      const nextCoord = {
        i: pieceCoord.i + diffI,
        j: pieceCoord.j - diffJ,
      }

      if (
        nextCoord.i > 7 ||
        nextCoord.i < 0 ||
        nextCoord.j > 7 ||
        nextCoord.j < 0
      ) {
        break
      }
      if (self.game.isEmptyCell(nextCoord)) {
        res.push(nextCoord)
      } else {
        const piece = board[nextCoord.i][nextCoord.j]
        if (
          !isAskForEatenCoords &&
          !self.game.isColorPieceWorthCurrPlayerColor(piece)
        ) {
          res.push(nextCoord)
        } else if (isAskForEatenCoords) {
          res.push(nextCoord)
        }
        break
      }
    }
  }
  return res
}
