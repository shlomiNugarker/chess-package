import { P, p } from '../../../../src/pieces/pawn'
import { game } from '../main'
import { cleanBoard } from './cleanBoard'
import { markCells } from './markCells'
import { renderBoard } from './renderBoard'

export function handleCellClick(ev: MouseEvent, i: number, j: number) {
  const clickedCoordCell = { i, j }
  const board = game.board.board
  const piece = board[i][j]
  const selectedCellCoord = game.selectedCellCoord

  if (ev.target instanceof Element) {
    const isSquareSelected = ev.target.classList.contains('selected')
    const isSquareMarked = ev.target.classList.contains('mark')
    const isSquareEatable = ev.target.classList.contains('eatable')
    const isSquareCastling = ev.target.classList.contains('castle')
    const target = ev.target

    if (isSquareEatable && selectedCellCoord) {
      // HANDLE EATABLE MOVE:
      console.log('HANDLE EATABLE MOVE:')
      game.movePiece(clickedCoordCell)
      renderBoard(game.getBoard())

      if (
        (board[i][j] instanceof P || board[i][j] instanceof p) &&
        game.isPawnStepsEnd(board[i][j] as p | P)
      ) {
        console.log('isPawnStepsEnd!!')
        cleanBoard()
      }
    } else if (isSquareCastling && selectedCellCoord) {
      // HANDLE CASTLING
      console.log('HANDLE CASTLING')
      game.doCastling(clickedCoordCell)
      renderBoard(game.getBoard())
      cleanBoard()
    } else if (
      piece &&
      piece !== null &&
      !game.isColorPieceWorthCurrPlayerColor(piece)
    ) {
      return
    } else if (isSquareSelected) {
      // UNSELECT:
      console.log('UNSELECT')
      game.selectedCellCoord = null
      cleanBoard()
    } else if (isSquareMarked && selectedCellCoord) {
      // HANDLE STEP MOVE:
      console.log('HANDLE STEP MOVE:')
      game.movePiece(clickedCoordCell)

      renderBoard(game.getBoard())
    } else {
      if (piece) {
        // HANDLE PIECE SELECTION:
        console.log('HANDLE PIECE SELECTION')
        cleanBoard()
        const piece = game.board.board[i][j]
        game.selectedCellCoord = { i, j }
        target.classList.add('selected')
        const possibleCoords = piece?.getPossibleCoords()
        if (possibleCoords) markCells(possibleCoords)
      }
    }
  }
  console.log(game)
}
