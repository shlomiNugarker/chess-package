import { Coord } from '../interfaces/Coord'
import { Piece } from './piece'

// QUEEN_WHITE:
export class Q extends Piece {
  name = 'Q'
  shape = '♕'
  constructor(coord: Coord) {
    super(coord)
  }
}
// QUEEN_BLACK:
export class q extends Piece {
  name = 'q'
  shape = '♛'
  constructor(coord: Coord) {
    super(coord)
  }
}
