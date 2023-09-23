import { Game } from '.'
import { K, k } from './pieces/king'
import { B, b } from './pieces/bishop'
import { N, n } from './pieces/knight'
import { P, p } from './pieces/pawn'
import { Q, q } from './pieces/queen'
import { R, r } from './pieces/rook'

export class Board {
  board: any[][] = []
  game: Game

  constructor(game: Game) {
    this.game = game
    for (let i = 0; i < 8; i++) {
      this.board[i] = []
      for (let j = 0; j < 8; j++) {
        let piece = null
        const position = { i, j }
        if (i === 1) {
          this.board[i][j] = new p(this.game, position)
        }
        if (i === 6) {
          this.board[i][j] = new P(this.game, position)
        }
        this.board[i][j] = piece
      }
    }

    // BLACK
    this.board[0][0] = new r({ i: 0, j: 0 })
    this.board[0][7] = new r({ i: 0, j: 7 })
    this.board[0][1] = new n(this.game, { i: 0, j: 1 })
    this.board[0][6] = new n(this.game, { i: 0, j: 6 })
    this.board[0][2] = new b(this.game, { i: 0, j: 2 })
    this.board[0][5] = new b(this.game, { i: 0, j: 5 })
    this.board[0][3] = new q({ i: 0, j: 3 })
    this.board[0][4] = new k(this.game, { i: 0, j: 4 })

    // WHITE
    this.board[7][0] = new R({ i: 7, j: 0 })
    this.board[7][7] = new R({ i: 7, j: 7 })
    this.board[7][1] = new N(this.game, { i: 7, j: 6 })
    this.board[7][6] = new N(this.game, { i: 7, j: 6 })
    this.board[7][2] = new B(this.game, { i: 7, j: 2 })
    this.board[7][5] = new B(this.game, { i: 7, j: 5 })
    this.board[7][3] = new Q({ i: 7, j: 3 })
    this.board[7][4] = new K(this.game, { i: 7, j: 4 })
  }
}
