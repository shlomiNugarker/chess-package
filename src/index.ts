import { Board } from './Board'
import { Coord } from './interfaces/Coord'

export class Game {
  isOnline: boolean
  board: Board
  selectedCellCoord: Coord | null = null
  isWhiteKingThreatened = false
  isBlackKingThreatened = false
  isBlackTurn = false
  eatableCellAfterTwoStepsPawnWhite: Coord | null = null
  eatableCellAfterTwoStepsPawnBlack: Coord | null = null
  kingPos = {
    black: { i: 0, j: 4 },
    white: { i: 7, j: 4 },
  }
  eatenPieces: {
    black: any[]
    white: any[]
  } = {
    black: [],
    white: [],
  }
  players: {
    white: string
    black: string
  }
  isCastlingLegal = {
    whiteLeftSide: true,
    whiteRightSide: true,
    whiteKing: true,
    blackLeftSide: true,
    blackRightSide: true,
    blackKing: true,
  }

  constructor(isOnline: boolean = false) {
    this.isOnline = isOnline
    this.board = new Board(this)
    this.players = { white: '', black: '' }
  }

  isEmptyCell(coord: { i: number; j: number }) {
    return this.board.board[coord.i][coord.j] === null
  }
  isColorPieceWorthCurrPlayerColor(piece: any) {
    return this.isBlackTurn === this.isBlackPiece(piece.name)
  }
  isBlackPiece(piece: any): boolean | undefined {
    switch (piece.name) {
      case 'K': // KING_WHITE
      case 'B': // BISHOP_WHITE
      case 'P': // PAWN_WHITE:
      case 'Q': // QUEEN_WHITE:
      case 'R': // ROOK_WHITE:
      case 'N': // KNIGHT_WHITE:
        return false

      case 'k': // KING_BLACK:
      case 'b': // BISHOP_BLACK:
      case 'p': //PAWN_BLACK:
      case 'q': //  QUEEN_BLACK:
      case 'r': // ROOK_BLACK:
      case 'n': // KNIGHT_BLACK:
        return true

      default:
        return undefined
    }
  }

  isOptionToCastling(pieceToCastling: any) {
    if (!this.selectedCellCoord) return false

    const currPiece =
      this.board.board[this.selectedCellCoord.i][this.selectedCellCoord.j]

    if (
      (pieceToCastling.name === 'K' && currPiece?.name === 'R') ||
      (pieceToCastling.name === 'R' && currPiece?.name === 'K') ||
      (pieceToCastling.name === 'k' && currPiece?.name === 'r') ||
      (pieceToCastling.name === 'r' && currPiece?.name === 'k')
    ) {
      return true
    }
    return false
  }
}

const newGame = new Game()
