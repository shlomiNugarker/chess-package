export function renderBoard(
  board: (string | null)[][],
  selector: string = 'table'
) {
  const elMat = document.querySelector(selector)
  if (!elMat) return

  let strHtml = ''

  for (let i = 0; i < board.length; i++) {
    const row = board[i]
    strHtml += '<tr>'

    for (let j = 0; j < row.length; j++) {
      const cell = row[j]
      const className = (i + j) % 2 === 0 ? 'white' : 'black'
      const tdId = `cell-${i}-${j}`

      strHtml += `<td id="${tdId}" class="${className} td">
                        ${cell || ''}
                    </td>`
    }

    strHtml += '</tr>'
  }

  elMat.innerHTML = strHtml
}
