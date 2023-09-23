import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { Piece } from './piece'

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

function getAllPossibleCoordsPawn(self: P | p) {
  const board = self.game.board.board
  const isWhite = self.game.isBlackPiece(self.name)
  const pieceCoord = self.coord

  const res: Coord[] = []

  // Regular steps
  let diff = isWhite ? -1 : 1
  let nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }

  if (self.game.isEmptyCell(nextCoord)) {
    res.push(nextCoord)

    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
      diff *= 2
      nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j }
      if (self.game.isEmptyCell(nextCoord)) res.push(nextCoord)
    }
  }

  // eatable cells:
  if (isWhite) {
    const nextLeftCoord = { i: pieceCoord.i - 1, j: pieceCoord.j - 1 }
    const nextRightCoord = { i: pieceCoord.i - 1, j: pieceCoord.j + 1 }

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
  if (!isWhite) {
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
    res.push(eatableCell)
  } else if (
    self.game.eatableCellAfterTwoStepsPawnBlack &&
    !self.game.isBlackTurn &&
    pieceCoord.i === 3
  ) {
    const eatableCell = { ...self.game.eatableCellAfterTwoStepsPawnBlack }
    eatableCell.i = eatableCell.i - 1
    res.push(eatableCell)
  }

  return res
}
