import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { B, b } from './bishop'
import { K, k } from './king'
import { N, n } from './knight'
import { P, p } from './pawn'
import { Piece } from './piece'
import { R, r } from './rook'

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

export function getAllPossibleCoordsQueen(
  self: P | p | K | k | B | b | N | n | Q | q | R | r | null,
  isAskForEatenCoords: boolean = false
) {
  const possibleCoords: Coord[] = []
  if (self) {
    const board = self.game.board.board
    const pieceCoord = self.coord

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
          possibleCoords.push(nextCoord)
        } else {
          const piece = board[nextCoord.i][nextCoord.j]
          if (
            !isAskForEatenCoords &&
            !self.game.isColorPieceWorthCurrPlayerColor(piece)
          ) {
            possibleCoords.push({ ...nextCoord, isEatable: true })
          } else if (isAskForEatenCoords) {
            const eatablePiece = { ...nextCoord, isEatable: true }
            possibleCoords.push(eatablePiece)
          }
          break
        }
      }
    }
  }

  if (self) self.game.currMarksSquares = possibleCoords
  return possibleCoords
}
