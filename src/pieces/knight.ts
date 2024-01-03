import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { B, b } from './bishop'
import { K, k } from './king'
import { P, p } from './pawn'
import { Piece } from './piece'
import { Q, q } from './queen'
import { R, r } from './rook'

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

export function getAllPossibleCoordsKnight(
  self: P | p | K | k | B | b | N | n | Q | q | R | r | null
) {
  const board = self?.game?.board?.board
  const pieceCoord = self?.coord

  const possibleCoords: Coord[] = []

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
    if (pieceCoord) {
      const diffI = possibleSteps[k].i
      const diffJ = possibleSteps[k].j
      const nextCoord = { i: pieceCoord.i + diffI, j: pieceCoord.j + diffJ }

      if (
        nextCoord.i >= 0 &&
        nextCoord.i < 8 &&
        nextCoord.j >= 0 &&
        nextCoord.j < 8 &&
        board
      ) {
        if (self?.game.isEmptyCell(nextCoord)) possibleCoords.push(nextCoord)
        else {
          const piece = board[nextCoord.i][nextCoord.j]
          if (!self?.game.isColorPieceWorthCurrPlayerColor(piece))
            possibleCoords.push({ ...nextCoord, isEatable: true }) //-> eatable  coord
        }
      }
    }
  }

  if (self) self.game.currMarksSquares = possibleCoords
  return possibleCoords
}
