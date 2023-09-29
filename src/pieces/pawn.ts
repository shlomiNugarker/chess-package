import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { B, b } from './bishop'
import { K, k } from './king'
import { N, n } from './knight'
import { Piece } from './piece'
import { Q, q } from './queen'
import { R, r } from './rook'

// PAWN_WHITE:
export class P extends Piece {
  name = 'P'
  shape = '♙'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }
  getPossibleCoords = (): Coord[] => getAllPossibleCoordsPawn(this)
}

// PAWN_BLACK:
export class p extends Piece {
  name = 'p'
  shape = '♟'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }
  getPossibleCoords = (): Coord[] => getAllPossibleCoordsPawn(this)
}

export function getAllPossibleCoordsPawn(
  self: P | p | K | k | B | b | N | n | Q | q | R | r | null
) {
  const res: Coord[] = []

  if (self) {
    const board = self.game.board.board
    const isBlackPiece = self.game.isBlackPiece(self)
    const pieceCoord = self.coord

    // Regular steps
    let diff = isBlackPiece ? 1 : -1

    let nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }

    if (self.game.isEmptyCell(nextCoord)) {
      res.push(nextCoord)

      if (
        (pieceCoord.i === 1 && isBlackPiece) ||
        (pieceCoord.i === 6 && !isBlackPiece)
      ) {
        diff *= 2
        nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
        if (self.game.isEmptyCell(nextCoord)) res.push(nextCoord)
      }
    }

    // eatable cells:
    if (!isBlackPiece) {
      const nextLeftCoord: Coord = { i: pieceCoord.i - 1, j: pieceCoord.j - 1 }
      const nextRightCoord: Coord = { i: pieceCoord.i - 1, j: pieceCoord.j + 1 }

      if (
        board[nextLeftCoord.i][nextLeftCoord.j] &&
        !self.game.isColorPieceWorthCurrPlayerColor(
          board[nextLeftCoord.i][nextLeftCoord.j]
        )
      ) {
        res.push({ ...nextLeftCoord, isEatable: true })
      }
      if (
        board[nextRightCoord.i][nextRightCoord.j] &&
        !self.game.isColorPieceWorthCurrPlayerColor(
          board[nextRightCoord.i][nextRightCoord.j]
        )
      ) {
        res.push({ ...nextRightCoord, isEatable: true })
      }
    }
    if (isBlackPiece) {
      const nextLeftCoord = { i: pieceCoord.i + 1, j: pieceCoord.j - 1 }
      const nextRightCoord = { i: pieceCoord.i + 1, j: pieceCoord.j + 1 }

      if (
        board[nextLeftCoord.i][nextLeftCoord.j] &&
        !self.game.isColorPieceWorthCurrPlayerColor(
          board[nextLeftCoord.i][nextLeftCoord.j]
        )
      ) {
        res.push(nextLeftCoord)
      }
      if (
        board[nextRightCoord.i][nextRightCoord.j] &&
        !self.game.isColorPieceWorthCurrPlayerColor(
          board[nextRightCoord.i][nextRightCoord.j]
        )
      ) {
        res.push(nextRightCoord)
      }
    }

    // Check if can eat cell after 2 steps of pawn:
    if (
      self.game.eatableCellAfterTwoStepsPawnWhite &&
      self.game.isBlackTurn &&
      pieceCoord.i === 4
    ) {
      const eatableCell = { ...self.game.eatableCellAfterTwoStepsPawnWhite }
      eatableCell.i = eatableCell.i + 1
      res.push({ ...eatableCell, isEatable: true })
    } else if (
      self.game.eatableCellAfterTwoStepsPawnBlack &&
      !self.game.isBlackTurn &&
      pieceCoord.i === 3
    ) {
      const eatableCell = { ...self.game.eatableCellAfterTwoStepsPawnBlack }
      eatableCell.i = eatableCell.i - 1
      res.push({ ...eatableCell, isEatable: true })
    }
  }
  return res
}
