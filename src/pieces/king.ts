import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { Piece } from './piece'

// KING_WHITE:
export class K extends Piece {
  name = 'K'
  shape = '♔'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }
  getPossibleCoords = (): Coord[] => getAllPossibleCoordsKing(this)
}

// KING_BLACK:
export class k extends Piece {
  name = 'k'
  shape = '♚'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }
  getPossibleCoords = (): Coord[] => getAllPossibleCoordsKing(this)
}

function getAllPossibleCoordsKing(self: K | K) {
  const { i: pieceI, j: pieceJ } = self.coord
  const possibleSteps = [
    { i: -1, j: 0 },
    { i: 0, j: 1 },
    { i: -1, j: 1 },
    { i: -1, j: -1 },
    { i: 0, j: -1 },
    { i: 1, j: 0 },
    { i: 1, j: -1 },
    { i: 1, j: 1 },
  ]

  const possibleCoords: Coord[] = []

  for (const step of possibleSteps) {
    const nextCoord = {
      i: pieceI + step.i,
      j: pieceJ + step.j,
    }

    if (
      nextCoord.i >= 0 &&
      nextCoord.i < 8 &&
      nextCoord.j >= 0 &&
      nextCoord.j < 8
    ) {
      if (self.game.isEmptyCell(nextCoord)) {
        possibleCoords.push(nextCoord)
      } else {
        const piece = self.game.board.board[nextCoord.i][nextCoord.j]
        if (!self.game.isColorPieceWorthCurrPlayerColor(piece)) {
          possibleCoords.push(nextCoord) // push eatable coord
        }
      }
    }
  }

  // Castling Coord:
  const castlingCoord: { i: number; j: number } = self.game.isBlackTurn
    ? { i: 0, j: 4 }
    : { i: 7, j: 4 }

  if (
    self.game.isCastlingLegal[self.game.isBlackTurn ? 'blackKing' : 'whiteKing']
  ) {
    for (const direction of [1, -1]) {
      const targetColumn = direction === 1 ? 7 : 0
      if (self.game.isEmptyCell({ i: castlingCoord.i, j: targetColumn })) {
        const rookColumn = direction === 1 ? 7 : 0
        const coordForCastle = { i: castlingCoord.i, j: rookColumn }

        if (
          self.game.isColorPieceWorthCurrPlayerColor(
            self.game.board.board[coordForCastle.i][coordForCastle.j]
          )
        ) {
          possibleCoords.push(coordForCastle)
        }
      }
    }
  }

  return possibleCoords
}
