import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { K, k } from './king'
import { N, n } from './knight'
import { P, p } from './pawn'
import { Piece } from './piece'
import { Q, q } from './queen'
import { R, r } from './rook'

// BISHOP_WHITE:
export class B extends Piece {
  name = 'B'
  shape = '♗'
  game: Game
  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }
  getPossibleCoords = (): Coord[] => getAllPossibleCoordsBishop(this)
}
// BISHOP_BLACK:
export class b extends Piece {
  name = 'b'
  shape = '♝'
  game: Game
  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }
  getPossibleCoords = (): Coord[] => getAllPossibleCoordsBishop(this)
}

export function getAllPossibleCoordsBishop(
  self: P | p | K | k | B | b | N | n | Q | q | R | r | null
) {
  const possibleCoords: Coord[] = []
  if (self) {
    const board = self.game.board.board
    const pieceCoord = self.coord

    const possibleDirections = [
      { i: 1, j: -1 }, // bottomLeft
      { i: 1, j: 1 }, // bottomRight
      { i: -1, j: -1 }, // topLeft
      { i: -1, j: 1 }, // topRight
    ]

    for (const direction of possibleDirections) {
      for (let distance = 1; distance <= 8; distance++) {
        const diffI = distance * direction.i
        const diffJ = distance * direction.j

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
          if (!self.game.isColorPieceWorthCurrPlayerColor(piece)) {
            possibleCoords.push({ ...nextCoord, isEatable: true }) // last coord -> eatable
          }
          break
        }
      }
    }
  }

  if (self) self.game.currMarksSquares = possibleCoords
  return possibleCoords
}
