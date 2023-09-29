import { Board } from './Board'
import { Coord } from './interfaces/Coord'
import { B, b, getAllPossibleCoordsBishop } from './pieces/bishop'
import {
  K,
  getAllPossibleCoordsKing,
  getAllPossibleKingCoordsToGetEatenPawn,
  k,
} from './pieces/king'
import { N, getAllPossibleCoordsKnight, n } from './pieces/knight'
import { P, p } from './pieces/pawn'
import { Q, getAllPossibleCoordsQueen, q } from './pieces/queen'
import { R, getAllPossibleCoordsRook, r } from './pieces/rook'
import _ from 'lodash'

export class Game {
  isOnline: boolean
  board: Board
  private _selectedCellCoord: Coord | null = null
  isWhiteKingThreatened = false
  isBlackKingThreatened = false
  isBlackTurn = false
  eatableCellAfterTwoStepsPawnWhite: Coord | null = null
  eatableCellAfterTwoStepsPawnBlack: Coord | null = null
  kingPos: {
    black: Coord
    white: Coord
  } = {
    black: { i: 0, j: 4 },
    white: { i: 7, j: 4 },
  }
  eatenPieces: {
    black: (K | k | B | b | N | n | P | p | Q | q | R | r)[]
    white: (K | k | B | b | N | n | P | p | Q | q | R | r)[]
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
    this.players = { white: 'userId_white', black: 'userId_black' }
  }
  set selectedCellCoord(coord: Coord | null) {
    this._selectedCellCoord = coord
  }
  get selectedCellCoord() {
    return this._selectedCellCoord
  }
  isEmptyCell(coord: Coord) {
    return this.board.board[coord.i][coord.j] === null
  }
  isColorPieceWorthCurrPlayerColor(
    piece: K | k | B | b | N | n | P | p | Q | q | R | r | null
  ) {
    return this.isBlackTurn === this.isBlackPiece(piece)
  }
  isBlackPiece(
    piece: P | p | K | k | B | b | N | n | Q | q | R | r | null
  ): boolean | undefined {
    switch (piece?.name) {
      case 'K': // KING_WHITE
      case 'B': // BISHOP_WHITE
      case 'P': // PAWN_WHITE
      case 'Q': // QUEEN_WHITE
      case 'R': // ROOK_WHITE
      case 'N': // KNIGHT_WHITE
        return false

      case 'k': // KING_BLACK
      case 'b': // BISHOP_BLACK
      case 'p': //PAWN_BLACK
      case 'q': //  QUEEN_BLACK
      case 'r': // ROOK_BLACK
      case 'n': // KNIGHT_BLACK
        return true

      default:
        return undefined
    }
  }
  isOptionToCastling(
    pieceToCastling: K | k | B | b | N | n | P | p | Q | q | R | r
  ) {
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
  isPawnStepsEnd(piece: P | p) {
    if (piece?.name === 'p' && this.isBlackTurn && piece.coord.i === 7) {
      return true
    } else if (
      piece?.name === 'P' &&
      !this.isBlackTurn &&
      piece.coord.i === 0
    ) {
      return true
    }
    return false
  }
  updateKingPos(
    toCoord: Coord,
    piece: P | p | K | k | B | b | N | n | Q | q | R | r | null
  ) {
    if (piece?.name === 'K') {
      // white king
      this.kingPos.white = { i: toCoord.i, j: toCoord.j }
    }
    if (piece?.name === 'k') {
      // black king
      this.kingPos.black = { i: toCoord.i, j: toCoord.j }
    }
    return this
  }
  isValidMove(fromCoord: Coord, toCoord: Coord) {
    const fromPiece = this.board.board[fromCoord.i][fromCoord.j]
    const possibleCoords = fromPiece?.getPossibleCoords()

    return (
      this.isColorPieceWorthCurrPlayerColor(fromPiece) &&
      possibleCoords &&
      possibleCoords?.some(
        (coord) => coord.i === toCoord.i && coord.j === toCoord.j
      )
    )
  }
  movePiece(toCellCoord: Coord) {
    const fromCoord = this.selectedCellCoord
    const toCoord = toCellCoord

    const isNextStepLegal = this.isNextStepLegal(toCoord)

    if (!isNextStepLegal) {
      this._selectedCellCoord = null
      console.log('ilegal step') // throw err?
      return
    }

    if (fromCoord && !this.isValidMove(fromCoord, toCoord)) {
      this._selectedCellCoord = null
      console.log('invalid move')
      return
    }

    const isKingMoved =
      (fromCoord && this.board.board[fromCoord.i][fromCoord.j]?.name === 'K') ||
      (fromCoord && this.board.board[fromCoord.i][fromCoord.j]?.name === 'k')

    const isRookMoved =
      (fromCoord && this.board.board[fromCoord.i][fromCoord.j]?.name === 'R') ||
      (fromCoord && this.board.board[fromCoord.i][fromCoord.j]?.name === 'r')

    const isCellWithPiece = this.board.board[toCoord.i][toCoord.j]

    if (!fromCoord) return

    if (
      !this.isBlackTurn &&
      this.eatableCellAfterTwoStepsPawnBlack &&
      this.eatableCellAfterTwoStepsPawnBlack.i === toCoord.i + 1 &&
      this.eatableCellAfterTwoStepsPawnBlack.j === toCoord.j
    ) {
      const piece =
        this.board.board[this.eatableCellAfterTwoStepsPawnBlack.i][
          this.eatableCellAfterTwoStepsPawnBlack.j
        ]
      this.board.board[this.eatableCellAfterTwoStepsPawnBlack.i][
        this.eatableCellAfterTwoStepsPawnBlack.j
      ] = null
      if (piece) this.eatenPieces.white.push(piece)
    }
    if (
      this.isBlackTurn &&
      this.eatableCellAfterTwoStepsPawnWhite &&
      this.eatableCellAfterTwoStepsPawnWhite.i === toCoord.i - 1 &&
      this.eatableCellAfterTwoStepsPawnWhite.j === toCoord.j
    ) {
      const piece =
        this.board.board[this.eatableCellAfterTwoStepsPawnWhite.i][
          this.eatableCellAfterTwoStepsPawnWhite.j
        ]
      this.board.board[this.eatableCellAfterTwoStepsPawnWhite.i][
        this.eatableCellAfterTwoStepsPawnWhite.j
      ] = null
      if (piece) this.eatenPieces.black.push(piece)
    }

    if (
      this.board.board[fromCoord.i][fromCoord.j]?.name === 'P' &&
      fromCoord.i === 6 &&
      toCoord.i === 4
    ) {
      this.eatableCellAfterTwoStepsPawnWhite = toCoord
    } else if (
      this.board.board[fromCoord.i][fromCoord.j]?.name === 'p' &&
      fromCoord.i === 1 &&
      toCoord.i === 3
    ) {
      this.eatableCellAfterTwoStepsPawnBlack = toCoord
    } else {
      if (this.eatableCellAfterTwoStepsPawnBlack)
        this.eatableCellAfterTwoStepsPawnBlack = null
      if (this.eatableCellAfterTwoStepsPawnWhite)
        this.eatableCellAfterTwoStepsPawnWhite = null
    }

    if (isCellWithPiece) {
      const eatenPiece = this.board.board[toCoord.i][toCoord.j]
      const isEatenPieceBlack = this.isBlackPiece(eatenPiece)

      if (isEatenPieceBlack === true) {
        if (eatenPiece) this.eatenPieces.white.push(eatenPiece)
      } else if (isEatenPieceBlack === false) {
        if (eatenPiece) this.eatenPieces.black.push(eatenPiece)
      }
    }

    const piece = this.board.board[fromCoord.i][fromCoord.j]
    if (piece) piece.coord = toCoord
    this.board.board[fromCoord.i][fromCoord.j] = null
    this.board.board[toCoord.i][toCoord.j] = piece

    if (isKingMoved) {
      this.updateKingPos(toCoord, piece)

      if (this.isBlackTurn) {
        this.isCastlingLegal.blackKing = false
      } else {
        this.isCastlingLegal.whiteKing = false
      }
    }

    if (isRookMoved) {
      if (fromCoord.j === 0) {
        this.isBlackTurn
          ? (this.isCastlingLegal.blackLeftSide = false)
          : (this.isCastlingLegal.whiteLeftSide = false)
      } else if (fromCoord.j === 7) {
        this.isBlackTurn
          ? (this.isCastlingLegal.blackRightSide = false)
          : (this.isCastlingLegal.whiteRightSide = false)
      }
    }

    this.selectedCellCoord = null

    return this
  }
  checkIfKingThreatened(
    isFakeCheck = false,
    board: any,
    coordToCheck?: { i: number; j: number }
  ) {
    // const board = this.board.board
    let isFoundThreatenPiece = false

    let kingPos = this.isBlackTurn
      ? board[this.kingPos.black.i][this.kingPos.black.j]
      : board[this.kingPos.white.i][this.kingPos.white.j]

    // this act is for check another piece as a king coords (for example when castling..)
    if (coordToCheck) kingPos = board[coordToCheck.i][coordToCheck.j]

    const knightOpts = getAllPossibleCoordsKnight(kingPos)
    const kingOpts = getAllPossibleCoordsKing(kingPos)
    const queenOpts = getAllPossibleCoordsQueen(kingPos, true)
    const pawnOpts = getAllPossibleKingCoordsToGetEatenPawn(kingPos)
    const bishopOpts = getAllPossibleCoordsBishop(kingPos)
    const rookOpts = getAllPossibleCoordsRook(kingPos)

    !isFoundThreatenPiece &&
      queenOpts.forEach((coord) => {
        const pieceToCheck = board[coord.i][coord.j]
        const threatenPiece = this.isBlackTurn
          ? 'Q' // QUEEN_WHITE
          : 'q' // QUEEN_BLACK

        if (pieceToCheck && pieceToCheck.name === threatenPiece) {
          isFoundThreatenPiece = true
          // !isFakeCheck && paintKingCellToRed(kingPos)
        }
      })

    !isFoundThreatenPiece &&
      kingOpts.forEach((coord) => {
        const pieceToCheck = board[coord.i][coord.j]
        const threatenPiece = this.isBlackTurn
          ? 'K' // KING_WHITE
          : 'k' // KING_BLACK

        if (pieceToCheck && pieceToCheck.name === threatenPiece) {
          isFoundThreatenPiece = true
          // !isFakeCheck && paintKingCellToRed(kingPos) // !!
        }
      })

    !isFoundThreatenPiece &&
      knightOpts.forEach((coord) => {
        const pieceToCheck = board[coord.i][coord.j]
        const threatenPiece = this.isBlackTurn
          ? 'N' // KNIGHT_WHITE
          : 'n' // KNIGHT_BLACK

        if (pieceToCheck && pieceToCheck.name === threatenPiece) {
          isFoundThreatenPiece = true
          // !isFakeCheck && paintKingCellToRed(kingPos) // !!
        }
      })

    !isFoundThreatenPiece &&
      pawnOpts.forEach((coord) => {
        const pieceToCheck = board[coord.i][coord.j]
        const threatenPiece = this.isBlackTurn
          ? 'P' // PAWN_WHITE
          : 'p' // PAWN_BLACK

        if (pieceToCheck && pieceToCheck.name === threatenPiece) {
          isFoundThreatenPiece = true
          // !isFakeCheck && paintKingCellToRed(kingPos)
        }
      })

    !isFoundThreatenPiece &&
      bishopOpts.forEach((coord) => {
        const pieceToCheck = board[coord.i][coord.j]
        const threatenPiece = this.isBlackTurn
          ? 'B' // BISHOP_WHITE
          : 'b' // BISHOP_BLACK

        if (pieceToCheck && pieceToCheck.name === threatenPiece) {
          isFoundThreatenPiece = true
          // !isFakeCheck && paintKingCellToRed(kingPos)
        }
      })

    !isFoundThreatenPiece &&
      rookOpts.forEach((coord) => {
        const pieceToCheck = board[coord.i][coord.j]
        const threatenPiece = this.isBlackTurn
          ? 'R' // ROOK_WHITE
          : 'r' // ROOK_BLACK

        if (pieceToCheck && pieceToCheck.name === threatenPiece) {
          isFoundThreatenPiece = true
          // !isFakeCheck && paintKingCellToRed(kingPos)
        }
      })

    if (!isFoundThreatenPiece) {
      if (!isFakeCheck) {
        this.isBlackTurn
          ? (this.isBlackKingThreatened = false)
          : (this.isWhiteKingThreatened = false)

        // document.querySelector('.red')?.classList.remove('red')
      }
      return false
    }

    this.isBlackTurn
      ? (this.isBlackKingThreatened = true)
      : (this.isWhiteKingThreatened = true)

    return true
  }
  isCastleThreatened(fromCoord: Coord, toCoord: Coord) {
    let isCastleLegal: boolean = true
    let coordsToCheck: Coord[] = []

    if (
      (fromCoord.j === 0 && toCoord.j === 4) ||
      (fromCoord.j === 4 && toCoord.j === 0)
    ) {
      if (this.isBlackTurn) {
        coordsToCheck = [
          { i: 0, j: 0 },
          { i: 0, j: 1 },
          { i: 0, j: 2 },
          { i: 0, j: 3 },
        ]
      } else if (!this.isBlackTurn) {
        coordsToCheck = [
          { i: 7, j: 0 },
          { i: 7, j: 1 },
          { i: 7, j: 2 },
          { i: 7, j: 3 },
        ]
      }
    } else if (
      (fromCoord.j === 7 && toCoord.j === 4) ||
      (fromCoord.j === 4 && toCoord.j === 7)
    ) {
      if (this.isBlackTurn) {
        coordsToCheck = [
          { i: 0, j: 5 },
          { i: 0, j: 6 },
          { i: 0, j: 7 },
        ]
      } else if (!this.isBlackTurn) {
        coordsToCheck = [
          { i: 7, j: 5 },
          { i: 7, j: 6 },
          { i: 7, j: 7 },
        ]
      }
    }

    coordsToCheck.forEach((coord) => {
      const isThreatened = this.checkIfKingThreatened(true, coord)
      if (isThreatened) {
        isCastleLegal = !isThreatened
      }
    })

    return isCastleLegal
  }
  doCastling(toCoord: Coord) {
    const fromCoord = this.selectedCellCoord
    if (!fromCoord) return

    let kingPiece: P | p | K | k | B | b | N | n | Q | q | R | r | null = null
    let newKingCoords: Coord | null = null
    let rookPiece: P | p | K | k | B | b | N | n | Q | q | R | r | null
    let rookCoords: Coord
    let isCastleLegal: boolean = true

    // WHITE KING:
    if (
      this.board.board[toCoord.i][toCoord.j]?.name === 'K' || // KING_WHITE
      this.board.board[toCoord.i][toCoord.j]?.name === 'R' // ROOK_WHITE
    ) {
      if (
        this.board.board[fromCoord.i][fromCoord.j]?.name === 'R' // ROOK_WHITE
      ) {
        rookPiece = this.board.board[fromCoord.i][fromCoord.j]
        kingPiece = this.board.board[toCoord.i][toCoord.j]
        rookCoords = fromCoord
      } else {
        rookPiece = this.board.board[toCoord.i][toCoord.j]
        kingPiece = this.board.board[fromCoord.i][fromCoord.j]
        rookCoords = toCoord
      }

      if (rookCoords.j === 0 && !this.isCastlingLegal.whiteLeftSide) return

      if (rookCoords.j === 7 && !this.isCastlingLegal.whiteRightSide) return

      if (!this.isCastlingLegal.whiteKing) return

      if (this.isWhiteKingThreatened) return

      this.board.board[fromCoord.i][fromCoord.j] = null
      this.board.board[toCoord.i][toCoord.j] = null

      if (fromCoord.j === 0 && toCoord.j === 4) {
        const isThreatened = this.isCastleThreatened(fromCoord, toCoord)
        if (!isThreatened) {
          isCastleLegal = false
          return { isCastleLegal }
        }
        this.board.board[7][3] = rookPiece
        this.board.board[7][2] = kingPiece
        newKingCoords = { i: 7, j: 2 }
        this.kingPos.white = newKingCoords
      } else if (fromCoord.j === 7 && toCoord.j === 4) {
        const isThreatened = this.isCastleThreatened(fromCoord, toCoord)
        if (!isThreatened) {
          isCastleLegal = false
          return { isCastleLegal }
        }
        this.board.board[7][5] = rookPiece
        this.board.board[7][6] = kingPiece
        newKingCoords = { i: 7, j: 6 }
        this.kingPos.white = newKingCoords
      } else if (fromCoord.j === 4 && toCoord.j === 7) {
        const isThreatened = this.isCastleThreatened(fromCoord, toCoord)
        if (!isThreatened) {
          isCastleLegal = false
          return { isCastleLegal }
        }
        this.board.board[7][5] = rookPiece
        this.board.board[7][6] = kingPiece
        newKingCoords = { i: 7, j: 6 }
        this.kingPos.white = newKingCoords
      } else if (fromCoord.j === 4 && toCoord.j === 0) {
        const isThreatened = this.isCastleThreatened(fromCoord, toCoord)
        if (!isThreatened) {
          isCastleLegal = false
          return { isCastleLegal }
        }
        this.board.board[7][3] = rookPiece
        this.board.board[7][2] = kingPiece
        newKingCoords = { i: 7, j: 2 }
        this.kingPos.white = newKingCoords
      }
      this.isCastlingLegal.whiteKing = false
    }

    // BLACK KING:
    if (
      this.board.board[toCoord.i][toCoord.j]?.name === 'k' || //KING_BLACK
      this.board.board[toCoord.i][toCoord.j]?.name === 'r' // ROOK_BLACK
    ) {
      if (
        this.board.board[fromCoord.i][fromCoord.j]?.name === 'r' // ROOK_BLACK
      ) {
        rookPiece = this.board.board[fromCoord.i][fromCoord.j]
        kingPiece = this.board.board[toCoord.i][toCoord.j]
        rookCoords = fromCoord
      } else {
        rookPiece = this.board.board[toCoord.i][toCoord.j]
        kingPiece = this.board.board[fromCoord.i][fromCoord.j]
        rookCoords = toCoord
      }

      if (rookCoords.j === 0 && !this.isCastlingLegal.blackLeftSide) return

      if (rookCoords.j === 7 && !this.isCastlingLegal.blackRightSide) return

      if (!this.isCastlingLegal.blackKing) return

      if (this.isBlackKingThreatened) return

      this.board.board[fromCoord.i][fromCoord.j] = null // EMPTY
      this.board.board[toCoord.i][toCoord.j] = null // EMPTY

      if (fromCoord.j === 0 && toCoord.j === 4) {
        const isThreatened = this.isCastleThreatened(fromCoord, toCoord)
        if (!isThreatened) {
          isCastleLegal = false
          return { isCastleLegal }
        }
        this.board.board[0][3] = rookPiece
        this.board.board[0][2] = kingPiece
        newKingCoords = { i: 0, j: 2 }
        this.kingPos.black = newKingCoords
      } else if (fromCoord.j === 7 && toCoord.j === 4) {
        const isThreatened = this.isCastleThreatened(fromCoord, toCoord)
        if (!isThreatened) {
          isCastleLegal = false
          return { isCastleLegal }
        }
        this.board.board[0][5] = rookPiece
        this.board.board[0][6] = kingPiece
        newKingCoords = { i: 0, j: 6 }
        this.kingPos.black = newKingCoords
      } else if (fromCoord.j === 4 && toCoord.j === 7) {
        const isThreatened = this.isCastleThreatened(fromCoord, toCoord)
        if (!isThreatened) {
          isCastleLegal = false
          return { isCastleLegal }
        }
        this.board.board[0][5] = rookPiece
        this.board.board[0][6] = kingPiece
        newKingCoords = { i: 0, j: 6 }
        this.kingPos.black = newKingCoords
      } else if (fromCoord.j === 4 && toCoord.j === 0) {
        const isThreatened = this.isCastleThreatened(fromCoord, toCoord)
        if (!isThreatened) {
          isCastleLegal = false
          return { isCastleLegal }
        }
        this.board.board[0][3] = rookPiece
        this.board.board[0][2] = kingPiece
        newKingCoords = { i: 0, j: 2 }
        this.kingPos.black = newKingCoords
      }
      this.isCastlingLegal.blackKing = false
    }

    return { isCastleLegal }
  }
  isNextStepLegal(toCoord: Coord) {
    const fromCoord = this.selectedCellCoord
    if (!fromCoord) return false

    const copyBoard = this.cloneDeep(this.board.board)

    const isKingMoved =
      copyBoard[fromCoord.i][fromCoord.j]?.name === 'K' || // KING_WHITE
      copyBoard[fromCoord.i][fromCoord.j]?.name === 'k' // KING_BLACK

    const piece = copyBoard[fromCoord.i][fromCoord.j]
    copyBoard[fromCoord.i][fromCoord.j] = null // EMPTY
    copyBoard[toCoord.i][toCoord.j] = piece

    if (isKingMoved) {
      // KING_WHITE
      if (piece?.name === 'K') {
        this.kingPos.white = { i: toCoord.i, j: toCoord.j }
        this.isCastlingLegal.whiteLeftSide = false
        this.isCastlingLegal.whiteRightSide = false
      }
      // KING_BLACK
      if (piece?.name === 'k') {
        this.kingPos.black = { i: toCoord.i, j: toCoord.j }
        this.isCastlingLegal.blackLeftSide = false
        this.isCastlingLegal.blackRightSide = false
      }
    }
    const isThreatened = this.checkIfKingThreatened(true, copyBoard)
    return !isThreatened
  }
  isPlayerWin() {
    const { isBlackTurn } = this
    const board = this.board.board
    const color = isBlackTurn ? 'black' : 'white'
    let isWin = true

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const piece = board[i][j]
        if (
          color === 'black'
            ? this.isBlackPiece(piece)
            : !this.isBlackPiece(piece) &&
              typeof this.isBlackPiece(piece) === 'boolean'
        ) {
          const possibleCoords = piece?.getPossibleCoords()

          if (!possibleCoords) return
          for (let k = 0; k < possibleCoords.length; k++) {
            const coord = possibleCoords[k]
            const copyState = this.cloneDeep(this)
            copyState.selectedCellCoord = { i, j }

            const isMoveLegal = copyState.isNextStepLegal(coord)

            if (isMoveLegal) {
              isWin = false
              break
            }
          }
        }
      }
    }
    return isWin
  }
  cloneDeep<T>(state: T): T {
    return _.cloneDeep(state)
  }
  addPieceInsteadPawn(
    coordsToFill: Coord,
    pieceToAdd: P | p | K | k | B | b | N | n | Q | q | R | r
  ) {
    this.board.board[coordsToFill.i][coordsToFill.j] = pieceToAdd
    return this
  }
  getBoard() {
    const board: (string | null)[][] = []
    for (let i = 0; i < this.board.board.length; i++) {
      board[i] = []
      for (let j = 0; j < this.board.board[i].length; j++) {
        board[i][j] = this.board.board[i][j]?.shape || null
      }
    }
    return board
  }
  switchTurn() {
    this.isBlackTurn = !this.isBlackTurn
  }
}
