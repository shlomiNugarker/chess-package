import { Coord } from '../../../../src/interfaces/Coord'

export const markCells = (coords: Coord[]) => {
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i]
    const elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`)
    if (!elCell) return

    if (coord.isCastle) {
      elCell.classList.add('castle')
    } else if (coord.isEatable) {
      elCell.classList.add('eatable')
    } else {
      elCell.innerHTML = '<span class="span"></span>'
      elCell.classList.add('mark')
    }
  }
}
