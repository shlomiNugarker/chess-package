import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { B, b } from './bishop'
import { N, n } from './knight'
import { P, p } from './pawn'
import { Piece } from './piece'
import { Q, q } from './queen'
import { R, r } from './rook'

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

export function getAllPossibleCoordsKing(
  self: P | p | K | k | B | b | N | n | Q | q | R | r | null
) {
  const possibleCoords: Coord[] = []
  if (self) {
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
            possibleCoords.push({ ...nextCoord, isEatable: true }) // push eatable coord
          }
        }
      }
    }

    // Castling Coord:
    const castlingCoord: { i: number; j: number } = self.game.isBlackTurn
      ? { i: 0, j: 4 }
      : { i: 7, j: 4 }

    if (
      self.game.isCastlingLegal[
        self.game.isBlackTurn ? 'blackKing' : 'whiteKing'
      ]
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
            possibleCoords.push({ ...coordForCastle, isCastle: true })
          }
        }
      }
    }
  }

  if (self) self.game.currMarksSquares = possibleCoords
  return possibleCoords
}

export function getAllPossibleKingCoordsToGetEatenPawn(
  self: P | p | K | k | B | b | N | n | Q | q | R | r | null
) {
  const possibleCoords: Coord[] = []
  if (self) {
    const { isBlackTurn } = self.game
    let kingCoord = self.coord

    const possibleSteps = [
      {
        i: isBlackTurn ? kingCoord.i + 1 : kingCoord.i - 1,
        j: isBlackTurn ? kingCoord.j - 1 : kingCoord.j - 1,
      },
      {
        i: isBlackTurn ? kingCoord.i + 1 : kingCoord.i - 1,
        j: isBlackTurn ? kingCoord.j + 1 : kingCoord.j + 1,
      },
    ]

    for (let k = 0; k < possibleSteps.length; k++) {
      if (
        possibleSteps[k].i >= 0 &&
        possibleSteps[k].i < 8 &&
        possibleSteps[k].j >= 0 &&
        possibleSteps[k].j < 8
      ) {
        possibleCoords.push(possibleSteps[k])
      }
    }
  }

  if (self) self.game.currMarksSquares = possibleCoords
  return possibleCoords
}
