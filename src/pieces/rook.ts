import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { B, b } from './bishop'
import { K, k } from './king'
import { N, n } from './knight'
import { P, p } from './pawn'
import { Piece } from './piece'
import { Q, q } from './queen'

// ROOK_WHITE:
export class R extends Piece {
  name = 'R'
  shape = '♖'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }

  getPossibleCoords = (): Coord[] => getAllPossibleCoordsRook(this)
}
// ROOK_BLACK:
export class r extends Piece {
  name = 'r'
  shape = '♜'
  game: Game

  constructor(game: Game, coord: Coord) {
    super(coord)
    this.game = game
  }

  getPossibleCoords = (): Coord[] => getAllPossibleCoordsRook(this)
}

export function getAllPossibleCoordsRook(
  self: P | p | K | k | B | b | N | n | Q | q | R | r | null
) {
  const possibleCoords: Coord[] = []
  if (self) {
    const board = self.game.board.board
    const pieceCoord = self.coord

    const possibleDir = [
      { i: -1, j: 0 }, //to top
      { i: 1, j: 0 }, // to bottom
      { i: 0, j: 1 }, // to right
      { i: 0, j: -1 }, // to left
    ]

    for (let k = 0; k < possibleDir.length; k++) {
      for (let i = 1; i <= 8; i++) {
        const diffI = i * possibleDir[k].i
        const diffJ = i * possibleDir[k].j

        const nextCoord: Coord = {
          i: pieceCoord.i + diffI,
          j: pieceCoord.j + diffJ,
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

          if (piece && !self.game.isColorPieceWorthCurrPlayerColor(piece)) {
            const eatablePiece = { ...nextCoord, isEatable: true }
            possibleCoords.push(eatablePiece)
          } else if (
            piece &&
            self.game.isColorPieceWorthCurrPlayerColor(piece) &&
            self.game.isOptionToCastling(piece)
          ) {
            let isCastlingLegal

            if (pieceCoord.j === 0) {
              isCastlingLegal = self.game.isBlackTurn
                ? self.game.isCastlingLegal.blackLeftSide
                : self.game.isCastlingLegal.whiteLeftSide
            }
            if (pieceCoord.j === 7) {
              isCastlingLegal = self.game.isBlackTurn
                ? self.game.isCastlingLegal.blackRightSide
                : self.game.isCastlingLegal.whiteRightSide
            }

            let isKingMoveLegal
            self.game.isBlackTurn
              ? (isKingMoveLegal = self.game.isCastlingLegal.blackKing)
              : (isKingMoveLegal = self.game.isCastlingLegal.whiteKing)

            isCastlingLegal &&
              isKingMoveLegal &&
              possibleCoords.push({ ...nextCoord, isCastle: true })
          }
          break
        }
      }
    }
  }

  if (self) self.game.currMarksSquares = possibleCoords
  return possibleCoords
}
