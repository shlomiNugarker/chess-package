import { Coord } from '../interfaces/Coord'
import { Piece } from './piece'

// ROOK_WHITE:
export class R extends Piece {
  name = 'R'
  shape = '♖'
  constructor(coord: Coord) {
    super(coord)
  }
}
// ROOK_BLACK:
export class r extends Piece {
  name = 'r'
  shape = '♜'
  constructor(coord: Coord) {
    super(coord)
  }
}
