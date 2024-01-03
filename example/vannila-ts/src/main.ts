import './style.css'
import * as chessService from '../../../src/index'
import { renderBoard } from './controller/renderBoard'
// import { handleCellClick } from './controller/handleCellClick'

export const game = new chessService.Game()

init()

function init() {
  renderBoard(game.getBoard())
  addEventListeners()
}

function addEventListeners() {
  // btn:
  document
    .querySelector('.switch-turn')
    ?.addEventListener('click', () => game.switchTurn())

  // board click:
  const elMat = document.querySelector('table')
  elMat?.addEventListener('click', function (event) {
    const clickedCell = event.target as HTMLTableCellElement
    if (clickedCell.tagName === 'TD') {
      const cellIdParts = clickedCell.id.split('-')
      const i = parseInt(cellIdParts[1])
      const j = parseInt(cellIdParts[2])

      game.handleCellClick(event, i, j)
    }
  })
}
